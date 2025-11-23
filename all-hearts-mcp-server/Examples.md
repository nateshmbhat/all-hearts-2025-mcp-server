# Example Usage & Testing

This document provides example queries for testing the All Hearts MCP server.

## Tool: get_game_timings

### Get All Game Schedules
```
Query: "When do the games start and end?"
Tool Call: get_game_timings()
```

## Tool: get_game_participants

### All Participants for a Game
```
Query: "Who participated in the typing game?"
Tool Call: get_game_participants(game="typing")
```

### House-Specific Participants
```
Query: "Show me Shakti Compliers participants for typing game"
Tool Call: get_game_participants(game="typing", house="Shakti Compliers")
```

### Other Games
```
Query: "Who played crossword?"
Tool Call: get_game_participants(game="crossword", house="Shakti Compliers")
```

```
Query: "Show wordle participants"
Tool Call: get_game_participants(game="wordle")
```

## Tool: get_non_participants

### Find Who Hasn't Played
```
Query: "Who from Shakti Compliers hasn't played typing game yet?"
Tool Call: get_non_participants(game="typing", house="Shakti Compliers")
```

### Check Other Games
```
Query: "Who hasn't played sudoku?"
Tool Call: get_non_participants(game="sudoku", house="Shakti Compliers")
```

```
Query: "Show non-participants for memory game"
Tool Call: get_non_participants(game="memory", house="Shakti Compliers")
```

## Tool: get_session_id

### Retrieve Session for Update
```
Query: "Get session ID for natesh.bhat@sadhguru.org in typing game"
Tool Call: get_session_id(game="typing", playerEmail="natesh.bhat@sadhguru.org")
```

## Tool: submit_typing_game

### Submit Typing Score
```
Query: "Submit typing game for Natesh with 75 WPM and 98% accuracy"
Tool Call: submit_typing_game(
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers ",
  wpm=75,
  accuracy=98.5
)
```

## Tool: submit_crossword_game

### Submit Crossword Results
```
Query: "Submit crossword game with 18 out of 20 words correct"
Tool Call: submit_crossword_game(
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers ",
  totalWords=20,
  correctWords=18,
  timeTaken=450
)
```

## Tool: submit_wordle_game

### Submit Wordle Results
```
Query: "Submit wordle game solved in 4 attempts"
Tool Call: submit_wordle_game(
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers ",
  attempts=4,
  solved=true,
  guesses=["CRANE", "STALE", "SHAKE", "SNAKE"]
)
```

## Tool: submit_sudoku_game

### Submit Sudoku (Legacy)
```
Query: "Submit sudoku completed in 10 minutes"
Tool Call: submit_sudoku_game(
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers ",
  difficulty="medium",
  timeTaken=600,
  completed=true
)
```

## Tool: submit_memory_game

### Submit Memory Game (Legacy)
```
Query: "Submit memory game with 12 matches in 25 tries"
Tool Call: submit_memory_game(
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers ",
  triesUsed=25,
  matchesFound=12,
  duration=180,
  completed=true
)
```

## Tool: create_typing_session

### Start Typing Session
```
Query: "Create typing session for Natesh"
Tool Call: create_typing_session(
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers "
)
```

## Tool: update_typing_session

### Update Typing Session with Results
```
Query: "Update typing session with results"
Tool Call: update_typing_session(
  id="session_abc123",
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers ",
  startTime="2025-11-19T10:05:30.000Z",
  endTime="2025-11-19T10:06:15.000Z",
  bestRound={
    score=75,
    accuracy=98.5,
    duration=45,
    wpm=75
  }
)
```

## Tool: create_wordle_session

### Start Wordle Session
```
Query: "Create wordle session for player"
Tool Call: create_wordle_session(
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers "
)
```

## Tool: update_wordle_session

### Update Wordle Session
```
Query: "Update wordle session with score"
Tool Call: update_wordle_session(
  id="session_xyz789",
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers ",
  startTime="2025-11-15T14:10:00.000Z",
  endTime="2025-11-15T14:15:30.000Z",
  attemptsUsed=4,
  solved=true,
  score=85,
  greens=20,
  yellows=8,
  wordsSolved=1
)
```

## Tool: create_crossword_session

### Start Crossword Session
```
Query: "Create crossword session with 20 words"
Tool Call: create_crossword_session(
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers ",
  totalWords=20
)
```

## Tool: update_crossword_session

### Update Crossword Session
```
Query: "Update crossword session with answers"
Tool Call: update_crossword_session(
  id="session_cross456",
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers ",
  startTime="2025-11-15T09:55:00.000Z",
  endTime="2025-11-15T10:02:30.000Z",
  totalWords=20,
  correctAnswers=18,
  completed=true
)
```

## Tool: create_sudoku_session

### Start Sudoku Session
```
Query: "Create sudoku session"
Tool Call: create_sudoku_session(
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers "
)
```

## Tool: update_sudoku_session

### Update Sudoku Session
```
Query: "Update sudoku session with completion time"
Tool Call: update_sudoku_session(
  id="session_sudoku789",
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers ",
  startTime="2025-11-27T10:00:00.000Z",
  difficulty="medium",
  timeTaken=600,
  completed=true
)
```

## Tool: create_memory_session

### Start Memory Session
```
Query: "Create memory game session"
Tool Call: create_memory_session(
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers "
)
```

## Tool: update_memory_session

### Update Memory Session
```
Query: "Update memory session with results"
Tool Call: update_memory_session(
  id="session_memory123",
  playerEmail="natesh.bhat@sadhguru.org",
  playerName="Natesh Bhat",
  house="Shakti Compliers ",
  startTime="2025-11-27T10:00:00.000Z",
  endTime="2025-11-27T10:03:00.000Z",
  triesUsed=25,
  matchesFound=12,
  duration=180,
  completed=true
)
```

## Tool: get_slack_users

### Get All Slack Users
```
Query: "Show me all Slack users"
Tool Call: get_slack_users()
```

## Tool: get_user_by_email

### Get User Details
```
Query: "Get details for natesh.bhat@sadhguru.org"
Tool Call: get_user_by_email(email="natesh.bhat@sadhguru.org")
```

## Complex Multi-Step Queries

### Monitor Game Participation
```
User: "Check typing game participation for Shakti Compliers"
Steps:
1. get_game_participants(game="typing", house="Shakti Compliers")
2. get_non_participants(game="typing", house="Shakti Compliers")
3. Calculate participation rate
```

### Submit Game with Session
```
User: "Submit sudoku game for a player"
Steps:
1. create_sudoku_session(playerEmail, playerName, house)
2. update_sudoku_session(id, startTime, difficulty, timeTaken, completed)
```

### Track Team Progress
```
User: "How is our team doing across all games?"
Steps:
1. get_game_timings() - Check which games are active
2. get_game_participants(game="typing", house="Shakti Compliers")
3. get_game_participants(game="crossword", house="Shakti Compliers")
4. get_game_participants(game="wordle", house="Shakti Compliers")
5. Compare participation rates
```

## Important Notes

### House Names (Critical!)
- "Shakti Compliers " (with trailing space)
- "Karma Debuggers " (with trailing space)
- "Zen Coders" (no space)
- "Akashic Warriors" (no space)

### Game Types
Available: `crossword`, `wordle`, `typing`, `sudoku`, `memory`

### Email Format
Must end with `@sadhguru.org`

### Timestamps
ISO 8601 format: `2025-11-19T10:00:00.000Z`
