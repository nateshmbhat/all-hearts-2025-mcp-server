# Memory Game API Update - November 24, 2025

## Summary
Updated the All Hearts MCP Server to reflect the removal of encryption for Memory game API endpoints, and added automatic endTime calculation with duration constraints.

## Changes Made

### 1. API Client (`src/api-client.ts`)

#### Removed Encryption from Memory Game Methods:
- **`createMemorySession()`** - Now sends plain JSON instead of encrypted data
- **`updateMemorySession()`** - Now sends plain JSON instead of encrypted data  
- **`submitMemoryGame()`** (legacy) - Now sends plain JSON instead of encrypted data

All three methods still use `Content-Type: text/plain` header but the request body is now a plain JSON object, not encrypted.

**Before:**
```typescript
async createMemorySession(data: MemorySessionCreate): Promise<GameSession> {
  const encryptedData = encryptData(data);
  const response = await this.client.post<GameSession>(
    "/api/games/memory/sessions",
    encryptedData,
    { headers: { "Content-Type": "text/plain" } }
  );
  return response.data;
}
```

**After:**
```typescript
async createMemorySession(data: MemorySessionCreate): Promise<GameSession> {
  const response = await this.client.post<GameSession>(
    "/api/games/memory/sessions",
    data,  // Plain JSON now
    { headers: { "Content-Type": "text/plain" } }
  );
  return response.data;
}
```

### 2. Types (`src/types.ts`)

#### Added `score` field to `MemorySessionUpdate`:
```typescript
export interface MemorySessionUpdate {
  id: string;
  playerEmail: string;
  house: string;
  name: string;
  startTime: string;
  endTime: string;
  triesUsed?: number;
  matchesFound?: number;
  duration?: number;
  score?: number;        // NEW: Added score field
  completed?: boolean;
}
```

### 3. MCP Server (`src/index.ts`)

#### Updated `update_memory_session` tool:
1. Added `score` parameter to the tool's input schema
2. Updated handler to pass `score` to the API client

## API Behavior Analysis

Based on the JavaScript code from the web app:

### POST `/api/games/memory/sessions` (Create Session)
```javascript
{
  playerEmail: string,
  house: string,
  playerName: string,
  gameType: "memory"
}
```

### PATCH `/api/games/memory/sessions` (Update Session)
```javascript
{
  id: string,
  playerEmail: string,
  house: string,
  name: string,              // Note: 'name' not 'playerName'
  startTime: string,
  endTime: string,
  triesUsed: number,        // Current round number
  matchesFound: number,     // Rounds won
  score: number,            // Calculated score
  completed: boolean
}
```

### GET `/api/games/memory/sessions` (Check Status)
Returns array of all sessions. Used to check if player already completed the game.

## Why Encryption Was Removed

The frontend code shows that:
1. Objects are passed directly to `axios.post()` and `axios.patch()`
2. While the `d.g0()` function is called and spread into headers, the request body is NOT encrypted
3. This is different from Sudoku which still uses encryption

## Duration Management

### Automatic endTime Calculation
The `update_memory_session` handler now automatically calculates `endTime` based on:
```
endTime = startTime + duration
```

### Duration Constraints
- **Minimum Duration**: 8 minutes (480 seconds)
- **Maximum Duration**: 10 minutes (600 seconds)
- **Default Duration**: 9 minutes (540 seconds) if not provided

Any duration value outside this range will be automatically clamped to the valid range.

### Example
```typescript
// If you provide duration = 720 (12 minutes)
// It will be clamped to 600 (10 minutes)

// If you provide duration = 300 (5 minutes)
// It will be clamped to 480 (8 minutes)

// If you don't provide duration
// It will default to 540 (9 minutes)
```

### Implementation
```typescript
const MIN_DURATION = 480; // 8 minutes
const MAX_DURATION = 600; // 10 minutes
const DEFAULT_DURATION = 540; // 9 minutes

// Clamp duration to valid range
let duration = args.duration || DEFAULT_DURATION;
duration = Math.max(MIN_DURATION, Math.min(MAX_DURATION, duration));

// Calculate endTime
const endTime = new Date(
  new Date(startTime).getTime() + duration * 1000
).toISOString();
```

## Testing Recommendations

Before using in production:
1. Test creating a memory session with the MCP tools
2. Test updating a memory session with score data
3. Verify the API accepts plain JSON (not encrypted)
4. Test duration clamping:
   - Try duration < 480 (should clamp to 480)
   - Try duration > 600 (should clamp to 600)
   - Try without duration (should default to 540)
5. Verify endTime = startTime + duration

## Notes
- Sudoku game still uses encryption (no changes made)
- All other games (Typing, Wordle, Crossword) never used encryption
- The `Content-Type: text/plain` header is kept for consistency with the frontend
- **The `endTime` parameter in `update_memory_session` is now IGNORED** - it's always calculated from startTime + duration

