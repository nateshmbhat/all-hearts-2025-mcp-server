# Changelog

All notable changes to the All Hearts 2025 MCP Server will be documented in this file.

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
