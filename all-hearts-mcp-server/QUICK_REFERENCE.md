# MCP Server - Quick Reference Guide

## 📚 All Available Tools

### 🔍 Query Tools

#### 1. `get_game_participants`
Get all participants for a specific game.
```typescript
{
  game: "typing" | "wordle" | "crossword" | "sudoku" | "memory",
  house?: "Shakti Compliers " // Optional filter
}
```

#### 2. `get_non_participants`
Get team members who haven't played a game yet.
```typescript
{
  game: "typing" | "wordle" | "crossword" | "sudoku" | "memory",
  house?: "Shakti Compliers " // Optional filter
}
```

#### 3. `get_session_id`
Get the session ID(s) for an existing game session by player email. Useful for updating existing sessions!
```typescript
{
  game: "typing" | "wordle" | "crossword" | "sudoku" | "memory",
  playerEmail: string
}
// Returns: { found: boolean, latestSessionId?: string, sessions?: [...] }
```

**Example:**
```javascript
const result = await get_session_id({
  game: "typing",
  playerEmail: "natesh.bhat@sadhguru.org"
});

if (result.found) {
  console.log(`Session ID: ${result.latestSessionId}`);
  // Use this ID to update the session
  await update_typing_session({
    id: result.latestSessionId,
    // ... other params
  });
}
```

#### 4. `get_game_timings`
Get start/end times for all games.
```typescript
{} // No parameters
```

---

## 🎮 Game Submission Tools

### ⚡ Typing Game (Two-Step Process)

#### Step 1: Create Session
**Tool:** `create_typing_session`
```typescript
{
  playerEmail: string,
  playerName: string,
  house?: string // Default: "Shakti Compliers "
}
// Returns: { sessionId: string, ... }
```

#### Step 2: Update Session
**Tool:** `update_typing_session`
```typescript
{
  id: string, // From create_typing_session
  playerEmail: string,
  playerName: string,
  house: string,
  startTime: string, // ISO 8601
  endTime: string,   // ISO 8601
  bestRound: {
    score: number,
    accuracy: number,
    duration: number,
    wpm: number
  },
  rounds?: Array<{
    score: number,
    accuracy: number,
    duration: number,
    wpm: number,
    timestamp?: string
  }>
}
```

**Example:**
```javascript
// Step 1
const session = await create_typing_session({
  playerEmail: "test@sadhguru.org",
  playerName: "Test User",
  house: "Shakti Compliers "
});

// Step 2
await update_typing_session({
  id: session.sessionId,
  playerEmail: "test@sadhguru.org",
  playerName: "Test User",
  house: "Shakti Compliers ",
  startTime: "2025-11-20T10:00:00Z",
  endTime: "2025-11-20T10:00:35Z",
  bestRound: { score: 85, accuracy: 98, duration: 30, wpm: 85 },
  rounds: [
    { score: 80, accuracy: 100, duration: 30, wpm: 80 },
    { score: 85, accuracy: 98, duration: 30, wpm: 85 }
  ]
});
```

---

### 🔤 Wordle Game (Two-Step Process)

#### Step 1: Create Session
**Tool:** `create_wordle_session`
```typescript
{
  playerEmail: string,
  playerName: string,
  house?: string // Default: "Shakti Compliers "
}
// Returns: { sessionId: string, ... }
```

#### Step 2: Update Session
**Tool:** `update_wordle_session`
```typescript
{
  id: string, // From create_wordle_session
  playerEmail: string,
  playerName: string,
  house: string,
  startTime: string, // ISO 8601
  endTime: string,   // ISO 8601
  attemptsUsed: number,
  solved: boolean,
  score: number,
  greens?: number,    // Green letters (correct position)
  yellows?: number,   // Yellow letters (wrong position)
  wordsSolved: number
}
```

**Example:**
```javascript
// Step 1
const session = await create_wordle_session({
  playerEmail: "test@sadhguru.org",
  playerName: "Test User",
  house: "Karma Debuggers "
});

// Step 2
await update_wordle_session({
  id: session.sessionId,
  playerEmail: "test@sadhguru.org",
  playerName: "Test User",
  house: "Karma Debuggers ",
  startTime: "2025-11-20T10:00:00Z",
  endTime: "2025-11-20T10:05:00Z",
  attemptsUsed: 4,
  solved: true,
  score: 450,
  greens: 15,
  yellows: 8,
  wordsSolved: 3
});
```

---

### 📝 Crossword Game (Two-Step Process)

#### Step 1: Create Session
**Tool:** `create_crossword_session`
```typescript
{
  playerEmail: string,
  playerName: string,
  house?: string,     // Default: "Shakti Compliers "
  totalWords: number
}
// Returns: { sessionId: string, ... }
```

#### Step 2: Update Session
**Tool:** `update_crossword_session`
```typescript
{
  id: string, // From create_crossword_session
  playerEmail: string,
  playerName: string,
  house: string,
  startTime: string, // ISO 8601
  endTime: string,   // ISO 8601
  totalWords: number,
  correctAnswers: number,
  completed: boolean
}
```

**Example:**
```javascript
// Step 1
const session = await create_crossword_session({
  playerEmail: "test@sadhguru.org",
  playerName: "Test User",
  house: "Zen Coders",
  totalWords: 20
});

// Step 2
await update_crossword_session({
  id: session.sessionId,
  playerEmail: "test@sadhguru.org",
  playerName: "Test User",
  house: "Zen Coders",
  startTime: "2025-11-20T10:00:00Z",
  endTime: "2025-11-20T10:15:00Z",
  totalWords: 20,
  correctAnswers: 18,
  completed: true
});
```

---

## 🏠 House Names (Important!)

**Note the trailing space in "Shakti Compliers "!**

Correct house names:
- `"Shakti Compliers "` ← Note trailing space!
- `"Karma Debuggers "`  ← Note trailing space!
- `"Zen Coders"`
- `"Akashic Warriors"`

---

## ⚠️ Legacy Tools (Not Recommended)

These tools still exist but don't follow the proper two-step process:
- ❌ `submit_typing_game` - Use `create_typing_session` + `update_typing_session` instead
- ❌ `submit_wordle_game` - Use `create_wordle_session` + `update_wordle_session` instead
- ❌ `submit_crossword_game` - Use `create_crossword_session` + `update_crossword_session` instead
- ❌ `submit_sudoku_game` - Keep using (no update needed yet)
- ❌ `submit_memory_game` - Keep using (no update needed yet)

---

## 🔧 Common Patterns

### Pattern 0: Update an Existing Session
```javascript
// Get the session ID for a player who already has a session
const sessionInfo = await get_session_id({
  game: "typing",
  playerEmail: "natesh.bhat@sadhguru.org"
});

if (sessionInfo.found) {
  // Update their existing session with new/better scores
  await update_typing_session({
    id: sessionInfo.latestSessionId,
    playerEmail: "natesh.bhat@sadhguru.org",
    playerName: "Natesh Bhat",
    house: "Shakti Compliers ",
    startTime: sessionInfo.sessions[0].startTime, // Use existing startTime
    endTime: new Date().toISOString(),
    bestRound: { score: 95, accuracy: 100, duration: 30, wpm: 95 }
  });
} else {
  console.log("No existing session found. Create a new one first.");
}
```

### Pattern 1: Bulk Team Submission
```javascript
const team = await get_non_participants({ 
  game: "typing", 
  house: "Shakti Compliers " 
});

for (const email of team.nonParticipants) {
  // Step 1: Create
  const session = await create_typing_session({
    playerEmail: email,
    playerName: email.split('@')[0],
    house: "Shakti Compliers "
  });
  
  // Step 2: Update with dummy/test scores
  await update_typing_session({
    id: session.sessionId,
    playerEmail: email,
    playerName: email.split('@')[0],
    house: "Shakti Compliers ",
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 35000).toISOString(),
    bestRound: { score: 65, accuracy: 98, duration: 30, wpm: 65 }
  });
}
```

### Pattern 2: Check Participation Status
```javascript
const participants = await get_game_participants({
  game: "typing",
  house: "Shakti Compliers "
});

console.log(`Participation: ${participants.totalParticipants}/62`);
console.log(`Rate: ${(participants.totalParticipants/62*100).toFixed(1)}%`);
```

---

## 📅 ISO 8601 Timestamp Format

Always use ISO 8601 format for timestamps:
```javascript
new Date().toISOString() // "2025-11-20T10:00:00.000Z"
```

---

## 🎯 Testing Checklist

- [ ] Build succeeds: `npm run build`
- [ ] Session created successfully
- [ ] Session ID returned
- [ ] Update with session ID works
- [ ] Submission appears in leaderboard
- [ ] Correct house attribution
- [ ] Scores displayed correctly

---

**Version:** 1.1.0  
**Last Updated:** November 20, 2025

