# All Hearts MCP Server - Setup Instructions

## ✅ Installation Complete!

The All Hearts MCP server has been successfully created and built in:
```
/Users/natesh.bhat/Desktop/All-Hearts-2025/all-hearts-mcp-server
```

## 🔧 Adding to Cursor MCP Configuration

To use this MCP server in Cursor, add it to your MCP configuration file:

### Location of MCP Config File:
```
~/.cursor/mcp.json
```
(Or: `/Users/natesh.bhat/.cursor/mcp.json`)

### Configuration to Add:

Open `~/.cursor/mcp.json` and add this server to the `mcpServers` section:

```json
{
  "mcpServers": {
    "all-hearts": {
      "command": "node",
      "args": [
        "/Users/natesh.bhat/Desktop/All-Hearts-2025/all-hearts-mcp-server/dist/index.js"
      ]
    }
  }
}
```

**Note:** If you already have other MCP servers configured, just add the `"all-hearts"` entry to your existing `mcpServers` object.

### Example Full Config with Multiple Servers:

```json
{
  "mcpServers": {
    "github": {
      "command": "uvx",
      "args": ["mcp-server-github"]
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"]
    },
    "all-hearts": {
      "command": "node",
      "args": [
        "/Users/natesh.bhat/Desktop/All-Hearts-2025/all-hearts-mcp-server/dist/index.js"
      ]
    }
  }
}
```

## 🔄 Restart Cursor

After adding the configuration:
1. Save the `mcp.json` file
2. Restart Cursor completely (Cmd+Q then reopen)
3. The All Hearts MCP server tools will now be available!

## 🎮 Available Tools

Once configured, you'll have access to these tools:

### 1. **get_game_participants**
Get list of all participants for a game
- Parameters: `game` (required), `house` (optional)
- Example: Get all Shakti Compliers typing game participants

### 2. **get_non_participants**
Get list of people who haven't submitted entries
- Parameters: `game` (required), `house` (optional)
- Example: Find who hasn't played typing game yet

### 3. **submit_typing_game**
Submit typing game score for a user
- Parameters: `playerEmail`, `playerName`, `wpm`, `accuracy`, `house` (optional)

### 4. **submit_crossword_game**
Submit crossword game entry
- Parameters: `playerEmail`, `playerName`, `totalWords`, `house` (optional)

### 5. **submit_wordle_game**
Submit wordle game entry
- Parameters: `playerEmail`, `playerName`, `house` (optional)

### 6. **submit_sudoku_game**
Submit sudoku game entry
- Parameters: `playerEmail`, `playerName`, `house` (optional)

### 7. **submit_memory_game**
Submit memory game entry
- Parameters: `playerEmail`, `playerName`, `house` (optional)

### 8. **get_game_timings**
Get timing info for all games

## 🧪 Testing the Server

To test if the server works correctly:

```bash
cd /Users/natesh.bhat/Desktop/All-Hearts-2025/all-hearts-mcp-server
node dist/index.js
```

The server should output: `All Hearts MCP Server running on stdio`

Press Ctrl+C to stop.

## 📝 Usage Examples (in Cursor)

Once configured, you can ask Cursor AI things like:

- "Get all participants for the typing game in Shakti Compliers house"
- "Show me who hasn't played the typing game yet from our team"
- "Get the game timings for all games"
- "How many Shakti Compliers members have participated in typing game?"

The AI will use the MCP tools automatically to fetch this information!

## 🔍 Troubleshooting

### Server Not Showing Up
1. Check that `mcp.json` syntax is valid (use a JSON validator)
2. Ensure the path to `dist/index.js` is correct
3. Restart Cursor completely
4. Check Cursor's developer console for errors

### Permission Errors
Make sure the server files have execute permissions:
```bash
chmod +x /Users/natesh.bhat/Desktop/All-Hearts-2025/all-hearts-mcp-server/dist/index.js
```

### Node Version
Ensure you're using Node.js v18 or higher:
```bash
node --version
```

## 🎯 Important Notes

- **House Name**: "Shakti Compliers " includes a trailing space (this is intentional!)
- **Team Size**: 61 members in Shakti Compliers
- **API Base**: `https://all-hearts-2025-games.netlify.app`
- **Games**: crossword, wordle, typing, sudoku, memory

## 📚 Documentation

Full documentation is available in:
```
/Users/natesh.bhat/Desktop/All-Hearts-2025/all-hearts-mcp-server/README.md
```

## ✨ Happy Gaming! ⚡

Good luck with the All Hearts 2025 competition!

**Shakti Compliers for the win! 💪⚡**





