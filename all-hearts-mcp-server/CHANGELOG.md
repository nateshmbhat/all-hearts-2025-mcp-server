# Changelog

All notable changes to the All Hearts 2025 MCP Server will be documented in this file.

## [1.2.1] - 2025-11-24

### Fixed - Memory Game Update Parameters

**Removed unnecessary `duration` parameter from memory game updates to match actual API behavior:**

#### Changes:
- **REMOVED** `duration` field from `MemorySessionUpdate` type
- **REMOVED** duration calculation logic from `update_memory_session` handler
- `update_memory_session` now requires `endTime` to be provided (matching actual game behavior)
- Tool description updated to reflect that `endTime` is required, not calculated

#### Reason:
Analysis of actual game submission shows the frontend sends:
- `id`, `playerEmail`, `house`, `name`
- `startTime`, `endTime` (both provided explicitly)
- `triesUsed`, `matchesFound`, `score`, `completed`

The frontend does NOT send `duration` - it only sends explicit `startTime` and `endTime` values.

## [1.2.0] - 2025-11-24

### Changed - Memory Game Encryption Removed & Duration Management

**Removed encryption for Memory game API endpoints to match current frontend implementation:**

#### API Client Changes:
- `createMemorySession()` - Now sends plain JSON instead of encrypted data
- `updateMemorySession()` - Now sends plain JSON instead of encrypted data
- **REMOVED** `submitMemoryGame()` - Legacy method removed (use create + update workflow)

All methods still use `Content-Type: text/plain` header but request body is now plain JSON.

#### Type & Tool Updates:
- Added `score` field to `MemorySessionUpdate` interface
- Updated `update_memory_session` MCP tool to accept `score` parameter
- **REMOVED** `submit_memory_game` MCP tool (use `create_memory_session` + `update_memory_session` instead)
- **REMOVED** `MemoryGameSubmission` type (no longer needed)

#### Duration Management (NEW):
The `update_memory_session` handler now automatically handles duration constraints:

- **Automatic endTime calculation**: `endTime = startTime + duration`
- **Duration constraints**: 8-10 minutes (480-600 seconds)
  - Minimum: 8 minutes (480 seconds)
  - Maximum: 10 minutes (600 seconds)  
  - Default: 9 minutes (540 seconds) if not provided
- **Auto-clamping**: Duration values outside valid range are automatically adjusted
- **endTime parameter ignored**: Any provided endTime value is overridden by the calculated value

**Example:**
```typescript
// duration = 720 (12 min) → clamped to 600 (10 min)
// duration = 300 (5 min) → clamped to 480 (8 min)
// duration not provided → defaults to 540 (9 min)
```

#### Why This Change?

Analysis of the frontend JavaScript code (page-4f2f146eb83fa45c.js) revealed:
1. Memory game POST/PATCH requests now send plain JSON objects
2. The encryption that was previously used has been removed
3. Score calculation is now done client-side and sent in the PATCH request
4. Duration must correspond to the time difference between startTime and endTime
5. Memory game duration should be realistic (8-10 minutes for gameplay)

This aligns with other games (Typing, Wordle, Crossword) which also use plain JSON. Only Sudoku still uses encryption.

**Note:** See `MEMORY_GAME_UPDATE.md` for detailed technical analysis.

## [1.1.0] - 2025-11-22

### Changed - Memory Game Field Mapping

**Updated memory game submission to match actual API response structure:**

#### Old Fields (Removed):
- `moves` - Number of moves made
- `timeTaken` - Time taken in seconds

#### New Fields (Added):
- `triesUsed` - Number of tries/attempts used in the game
- `matchesFound` - Number of matches found in the game
- `duration` - Time taken in seconds (replaces `timeTaken`)
- `completed` - Whether the game was completed (kept)

#### Why This Change?

The MCP server was using field names that didn't match the actual API response format. After analyzing real API responses from the memory game endpoint, we discovered the correct field names are:

```json
{
  "id": "pranav.jayaraj-ext@sadhguru.org-649-1",
  "playerName": "Pranav Jayaraj",
  "playerEmail": "pranav.jayaraj-ext@sadhguru.org",
  "house": "Shakti Compliers ",
  "gameType": "memory",
  "startTime": "2025-11-22T10:19:15.058Z",
  "completed": true,
  "triesUsed": 0,      ← API uses this
  "matchesFound": 0,   ← API uses this
  "duration": 649,     ← API uses this (not "timeTaken")
  "score": 355
}
```

#### Updated Files:
- `src/types.ts` - Updated `MemoryGameSubmission` interface
- `src/index.ts` - Updated `submit_memory_game` tool handler
- `README.md` - Updated documentation
- `QUICK_REFERENCE.md` - Added memory game example

#### Migration Guide:

**Before:**
```typescript
await submit_memory_game({
  playerEmail: "test@sadhguru.org",
  playerName: "Test User",
  house: "Shakti Compliers ",
  moves: 20,          // ❌ Old field
  timeTaken: 649,     // ❌ Old field
  completed: true
});
```

**After:**
```typescript
await submit_memory_game({
  playerEmail: "test@sadhguru.org",
  playerName: "Test User",
  house: "Shakti Compliers ",
  triesUsed: 20,      // ✅ New field
  matchesFound: 8,    // ✅ New field
  duration: 649,      // ✅ New field (replaces timeTaken)
  completed: true
});
```

### Technical Details:

The API expects encrypted JSON payloads with these exact field names. Using incorrect field names could result in:
- Missing data in the leaderboard
- Incorrect score calculations
- Failed submissions

This update ensures the MCP server sends data in the exact format expected by the API backend.

---

## [1.0.0] - 2025-11-20

### Added
- Initial release of All Hearts 2025 MCP Server
- Support for all 5 games: Crossword, Wordle, Typing, Sudoku, Memory
- Two-step session creation process for Typing, Wordle, and Crossword games
- Query tools for participants and non-participants
- Game timing information retrieval
- Session ID lookup tool
- Comprehensive documentation and examples

### Features
- Encryption support for API submissions
- Shakti Compliers team member tracking
- House-based filtering
- ISO 8601 timestamp handling
