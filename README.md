# All Hearts 2025 MCP Server

An **MCP (Model Context Protocol) server** that enables AI assistants (Claude, Windsurf, etc.) to interact with a multi-game competition platform for organizational events. Built with TypeScript using the `@modelcontextprotocol/sdk`.

---

## 🎯 Use Cases Enabled by This MCP

1. **AI-Powered Game Coaching** - AI can check participation and remind non-participants
2. **Automated Score Submission** - Submit game results via natural language
3. **Real-Time Leaderboard Queries** - "How is my team doing?" → instant stats
4. **Participation Monitoring** - "Who hasn't played the typing game yet?"
5. **Player Performance Tracking** - "What's my rank?" → detailed breakdown
6. **Event Coordination** - Check game windows, send reminders based on timing

---

## 🎮 Core Features

### Multi-Game Support
Supports 5 game types: **Crossword**, **Wordle**, **Typing**, **Sudoku**, and **Memory**.

### Participation Tracking
| Tool | Description |
|------|-------------|
| `get_game_participants` | Retrieve all participants for any game, filterable by house/team |
| `get_non_participants` | Identify team members who haven't played yet (with built-in team roster) |

### Game Session Management (Two-Step Flow)
Each game supports a create → update workflow for precise session control:

| Game | Create Tool | Update Tool |
|------|-------------|-------------|
| Typing | `create_typing_session` | `update_typing_session` |
| Crossword | `create_crossword_session` | `update_crossword_session` |
| Wordle | `create_wordle_session` | `update_wordle_session` |
| Sudoku | `create_sudoku_session` | `update_sudoku_session` |
| Memory | `create_memory_session` | `update_memory_session` |

### Legacy Submit Tools
One-shot submission for backward compatibility: `submit_typing_game`, `submit_crossword_game`, `submit_wordle_game`, `submit_sudoku_game`

### Leaderboard & Analytics
| Tool | Description |
|------|-------------|
| `get_house_standings` | All houses ranked by total points with per-game breakdown |
| `get_house_details` | Detailed stats for a specific house |
| `get_top_players` | Top N players overall or filtered by house |
| `get_player_rank` | Individual player's rank, total score, and per-game scores |
| `get_game_leaderboard` | Top performers for a specific game |

### Utility Tools
| Tool | Description |
|------|-------------|
| `get_game_timings` | Retrieve start/end times for all games (UTC & IST) |
| `get_session_id` | Retrieve existing session ID by player email |
| `get_user_by_email` | Get user's house and name from email address |
| `get_slack_users` | Fetch Slack workspace user directory |

### Security
- **AES Encryption** for sensitive game submissions (Sudoku uses encrypted payloads)
- Encryption key management via CryptoJS

---

## 📦 Technical Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js (ES Modules) |
| Language | TypeScript |
| MCP SDK | `@modelcontextprotocol/sdk` v1.0.4 |
| HTTP Client | Axios |
| Encryption | CryptoJS (AES) |
| Transport | stdio (standard MCP transport) |

---

## 🚀 Key Differentiators

1. **Full CRUD for Game Sessions** - Not just read-only; can create and update game data
2. **Multi-House Support** - 4 competing houses with individual tracking
3. **Intelligent Non-Participant Detection** - Compares against known team rosters
4. **Dual Submission Modes** - Two-step (create/update) and one-shot (legacy) patterns
5. **Encrypted Payloads** - Security-conscious design for sensitive games
6. **26 MCP Tools** - Comprehensive coverage of the game platform's functionality

---

## 🛠 Installation

```bash
cd all-hearts-mcp-server
npm install
npm run build
```

## Configuration

Add this to your MCP client configuration (e.g., Claude Desktop, Windsurf):

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

---

## 📁 Project Structure

```
all-hearts-mcp-server/
├── src/
│   ├── index.ts          # Main MCP server (26 tools)
│   ├── api-client.ts     # API client with encryption
│   ├── types.ts          # TypeScript types
│   └── team-members.ts   # Team roster for participation tracking
├── dist/                 # Compiled JavaScript
├── package.json
└── tsconfig.json
```

## License

MIT






