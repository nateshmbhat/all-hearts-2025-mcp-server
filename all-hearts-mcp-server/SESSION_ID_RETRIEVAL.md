# Session ID Retrieval Guide

## 🎯 Overview

Yes! **You can retrieve session IDs for already submitted sessions** using the new `get_session_id` tool.

This is a game-changer because:
- ✅ You can update existing sessions without creating duplicates
- ✅ No need to store session IDs externally
- ✅ Works with sessions created through the actual game UI
- ✅ Enables bulk updates to improve team scores

---

## 📊 What We Discovered

### Session Data Structure

When you fetch sessions from the API, each session includes an `id` field:

```json
{
  "id": "natesh.bhat@sadhguru.org-typing-24",
  "playerEmail": "natesh.bhat@sadhguru.org",
  "playerName": "natesh.bhat",
  "house": "Shakti Compliers ",
  "bestScore": 127,
  "bestAccuracy": 100,
  "duration": 45,
  "completed": true
}
```

### Session ID Formats

Different games use different ID formats:

| Game | Format | Example |
|------|--------|---------|
| **Typing** | `{email}-typing-{number}` | `natesh.bhat@sadhguru.org-typing-24` |
| **Wordle** | `{email}-{number}-0` | `rashmi.hollikeri@sadhguru.org-81-0` |
| **Crossword** | `{email}-{number}-{number}` | `jeevanraj.angamuthu@sadhguru.org-41-83` |

---

## 🔧 Using the `get_session_id` Tool

### Basic Usage

```typescript
const result = await get_session_id({
  game: "typing",
  playerEmail: "natesh.bhat@sadhguru.org"
});
```

### Response Format

#### When Session Found:
```json
{
  "found": true,
  "game": "typing",
  "playerEmail": "natesh.bhat@sadhguru.org",
  "totalSessions": 1,
  "sessions": [
    {
      "id": "natesh.bhat@sadhguru.org-typing-24",
      "playerName": "natesh.bhat",
      "house": "Shakti Compliers ",
      "completed": true,
      "score": 127,
      "startTime": "2025-11-19T08:30:00.000Z"
    }
  ],
  "latestSessionId": "natesh.bhat@sadhguru.org-typing-24"
}
```

#### When Session NOT Found:
```json
{
  "found": false,
  "message": "No typing session found for test@sadhguru.org",
  "game": "typing",
  "playerEmail": "test@sadhguru.org"
}
```

---

## 💡 Use Cases

### Use Case 1: Update Existing Session to Improve Score

```javascript
// Step 1: Get the session ID
const sessionInfo = await get_session_id({
  game: "typing",
  playerEmail: "amit.jangid@sadhguru.org"
});

if (sessionInfo.found) {
  // Step 2: Update with better scores
  await update_typing_session({
    id: sessionInfo.latestSessionId,
    playerEmail: "amit.jangid@sadhguru.org",
    playerName: "Amit Jangid",
    house: "Shakti Compliers ",
    startTime: sessionInfo.sessions[0].startTime, // Keep original
    endTime: new Date().toISOString(),
    bestRound: {
      score: 85,  // Improved from 37
      accuracy: 100,
      duration: 30,
      wpm: 85
    },
    rounds: [
      { score: 80, accuracy: 100, duration: 30, wpm: 80 },
      { score: 85, accuracy: 100, duration: 30, wpm: 85 }
    ]
  });
  
  console.log("✅ Session updated successfully!");
} else {
  console.log("❌ No existing session found. Create one first.");
}
```

### Use Case 2: Bulk Update Team Scores

```javascript
// Get all participants who need score improvements
const participants = await get_game_participants({
  game: "typing",
  house: "Shakti Compliers "
});

// Filter those with scores below 60
const needsImprovement = participants.participants.filter(p => p.score < 60);

for (const player of needsImprovement) {
  // Get their session ID
  const sessionInfo = await get_session_id({
    game: "typing",
    playerEmail: player.email
  });
  
  if (sessionInfo.found) {
    // Update with better score
    await update_typing_session({
      id: sessionInfo.latestSessionId,
      playerEmail: player.email,
      playerName: player.name,
      house: player.house,
      startTime: sessionInfo.sessions[0].startTime,
      endTime: new Date().toISOString(),
      bestRound: {
        score: 75,  // Target score
        accuracy: 98,
        duration: 30,
        wpm: 75
      }
    });
    
    console.log(`✅ Updated ${player.name}: ${player.score} → 75`);
  }
}
```

### Use Case 3: Fix Incorrect House Attribution

```javascript
// Someone accidentally submitted to wrong house
const sessionInfo = await get_session_id({
  game: "wordle",
  playerEmail: "misplaced.player@sadhguru.org"
});

if (sessionInfo.found) {
  // Update to correct house
  await update_wordle_session({
    id: sessionInfo.latestSessionId,
    playerEmail: "misplaced.player@sadhguru.org",
    playerName: "Player Name",
    house: "Shakti Compliers ",  // ✅ Correct house
    startTime: sessionInfo.sessions[0].startTime,
    endTime: new Date().toISOString(),
    attemptsUsed: 4,
    solved: true,
    score: 450,
    wordsSolved: 3
  });
  
  console.log("✅ House corrected!");
}
```

### Use Case 4: Check Multiple Players at Once

```javascript
const emails = [
  "player1@sadhguru.org",
  "player2@sadhguru.org",
  "player3@sadhguru.org"
];

const results = [];

for (const email of emails) {
  const sessionInfo = await get_session_id({
    game: "typing",
    playerEmail: email
  });
  
  results.push({
    email,
    hasSession: sessionInfo.found,
    sessionId: sessionInfo.latestSessionId,
    currentScore: sessionInfo.found ? sessionInfo.sessions[0].score : null
  });
}

console.table(results);
```

---

## ⚠️ Important Notes

### 1. Multiple Sessions
If a player has multiple sessions (played multiple times), the tool returns:
- `totalSessions` - Count of all sessions
- `sessions` - Array of all sessions
- `latestSessionId` - Quick access to the most recent one

### 2. StartTime Preservation
When updating an existing session, it's recommended to preserve the original `startTime`:
```javascript
startTime: sessionInfo.sessions[0].startTime  // Use existing
```

### 3. House Name Format
Remember the trailing space in "Shakti Compliers ":
```javascript
house: "Shakti Compliers "  // ✅ Correct
house: "Shakti Compliers"   // ❌ Wrong (missing space)
```

### 4. Score Updates
The API will accept score updates even if they're lower than the previous score. The leaderboard might show the best score automatically.

---

## 🎬 Complete Example: Full Workflow

```javascript
// Complete workflow: Create OR Update
async function submitOrUpdateTypingScore(playerEmail, playerName, scoreData) {
  // Step 1: Check if session exists
  const sessionInfo = await get_session_id({
    game: "typing",
    playerEmail: playerEmail
  });
  
  if (sessionInfo.found) {
    // Session exists - update it
    console.log(`📝 Updating existing session: ${sessionInfo.latestSessionId}`);
    
    await update_typing_session({
      id: sessionInfo.latestSessionId,
      playerEmail: playerEmail,
      playerName: playerName,
      house: "Shakti Compliers ",
      startTime: sessionInfo.sessions[0].startTime,
      endTime: new Date().toISOString(),
      bestRound: scoreData
    });
    
    console.log("✅ Session updated!");
  } else {
    // No session - create new one
    console.log("🆕 Creating new session...");
    
    const newSession = await create_typing_session({
      playerEmail: playerEmail,
      playerName: playerName,
      house: "Shakti Compliers "
    });
    
    console.log(`✅ Session created: ${newSession.sessionId}`);
    
    // Then update with scores
    await update_typing_session({
      id: newSession.sessionId,
      playerEmail: playerEmail,
      playerName: playerName,
      house: "Shakti Compliers ",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 35000).toISOString(),
      bestRound: scoreData
    });
    
    console.log("✅ Session updated with scores!");
  }
}

// Usage
await submitOrUpdateTypingScore(
  "test@sadhguru.org",
  "Test User",
  { score: 85, accuracy: 98, duration: 30, wpm: 85 }
);
```

---

## 🚀 Quick Commands

### Check Your Own Session
```javascript
await get_session_id({
  game: "typing",
  playerEmail: "natesh.bhat@sadhguru.org"
});
```

### Check Team Coverage
```javascript
const team = ["email1@sadhguru.org", "email2@sadhguru.org", "email3@sadhguru.org"];
const withSessions = [];
const withoutSessions = [];

for (const email of team) {
  const info = await get_session_id({ game: "typing", playerEmail: email });
  if (info.found) {
    withSessions.push(email);
  } else {
    withoutSessions.push(email);
  }
}

console.log(`✅ With sessions: ${withSessions.length}`);
console.log(`❌ Without sessions: ${withoutSessions.length}`);
```

---

**Version:** 1.2.0  
**Last Updated:** November 20, 2025  
**Status:** ✅ Ready to Use

