# All Hearts 2025 MCP Server

An MCP (Model Context Protocol) server that wraps the All Hearts 2025 games API endpoints.

## Features

This MCP server provides the following tools:

### 1. `get_game_participants`
Get list of all participants for a specific game, optionally filtered by house.

**Parameters:**
- `game` (required): One of "crossword", "wordle", "typing", "sudoku", "memory"
- `house` (optional): House name to filter by (e.g., "Shakti Compliers ")

**Returns:** JSON with participant details including email, name, house, score, and completion status.

### 2. `get_non_participants`
Get list of people who have not yet submitted any entry for a particular game.

**Parameters:**
- `game` (required): One of "crossword", "wordle", "typing", "sudoku", "memory"
- `house` (optional): House name to filter by (e.g., "Shakti Compliers ")

**Returns:** JSON with non-participant emails and participation statistics.

### 3. `submit_typing_game`
Submit a typing game entry for a user.

**Parameters:**
- `playerEmail` (required): Email address of the player
- `playerName` (required): Display name of the player
- `house` (optional): House name (default: "Shakti Compliers ")
- `wpm` (required): Words per minute score
- `accuracy` (required): Accuracy percentage (0-100)
- `duration` (optional): Test duration in seconds (default: 30)

### 4. `submit_crossword_game`
Submit a crossword game entry for a user.

**Parameters:**
- `playerEmail` (required): Email address of the player
- `playerName` (required): Display name of the player
- `house` (optional): House name (default: "Shakti Compliers ")
- `totalWords` (required): Total number of words in crossword
- `correctWords` (optional): Number of correct words
- `timeTaken` (optional): Time taken in seconds

### 5. `submit_wordle_game`
Submit a wordle game entry for a user.

**Parameters:**
- `playerEmail` (required): Email address of the player
- `playerName` (required): Display name of the player
- `house` (optional): House name (default: "Shakti Compliers ")
- `attempts` (optional): Number of attempts
- `solved` (optional): Whether puzzle was solved
- `guesses` (optional): Array of guessed words

### 6. `submit_sudoku_game`
Submit a sudoku game entry for a user.

**Parameters:**
- `playerEmail` (required): Email address of the player
- `playerName` (required): Display name of the player
- `house` (optional): House name (default: "Shakti Compliers ")
- `difficulty` (optional): Difficulty level
- `timeTaken` (optional): Time taken in seconds
- `completed` (optional): Whether puzzle was completed

### 7. `submit_memory_game`
Submit a memory game entry for a user.

**Parameters:**
- `playerEmail` (required): Email address of the player
- `playerName` (required): Display name of the player
- `house` (optional): House name (default: "Shakti Compliers ")
- `moves` (optional): Number of moves made
- `timeTaken` (optional): Time taken in seconds
- `completed` (optional): Whether game was completed

### 8. `get_game_timings`
Get timing information for all games (start and end times).

**Returns:** JSON with start/end times for all games in both UTC and IST.

## Installation

```bash
cd all-hearts-mcp-server
npm install
npm run build
```

## Development

```bash
# Watch mode for development
npm run watch

# Run in development mode with tsx
npm run dev
```

## Configuration

Add this to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "all-hearts": {
      "command": "node",
      "args": ["/absolute/path/to/all-hearts-mcp-server/dist/index.js"]
    }
  }
}
```

Or use npx after publishing:

```json
{
  "mcpServers": {
    "all-hearts": {
      "command": "npx",
      "args": ["all-hearts-mcp-server"]
    }
  }
}
```

## API Base URL

The server connects to: `https://all-hearts-2025-games.netlify.app`

## Important Notes

- **House Name**: The house name "Shakti Compliers " includes a trailing space - this is intentional and matches the API!
- **Team Size**: The Shakti Compliers team has 61 members (as listed in `team-members.ts`)
- **Game Types**: Supported games are: crossword, wordle, typing, sudoku, memory

## Project Structure

```
all-hearts-mcp-server/
├── src/
│   ├── index.ts          # Main MCP server implementation
│   ├── api-client.ts     # API client wrapper
│   ├── types.ts          # TypeScript types
│   └── team-members.ts   # Shakti Compliers team list
├── dist/                 # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## License

MIT





