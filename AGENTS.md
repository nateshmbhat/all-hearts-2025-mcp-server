# Overview
My name is Natesh Bhat. I am part of Isha Foundation organization (IT department) and we are going to have an event in December 1st week. As part of event and leading up the event we have been split into 4 different houses and every few days leading up to the day of the event we'll be playing games digitally in this website : https://all-hearts-2025-games.netlify.app/
My house name : "Shakti Compliers"
Leaderboard link : https://all-hearts-2025-games.netlify.app/leaderboard

- Our slack channel name consisting of all the members of all houses is : "itapps-all-hearts-meeting-2025"
- Our slack group of shakti compliers is : "shakti-compliers" with slack id : C09T8C5K9T6
- NEVER SEND SLACK messages without final confirmation from me. Before you send anything just show me the message and ask me if it is correct and if i give you permission then only send the message.
- When you send a slack message through MCP, if the person is male use "anna" and if the person is female use "akka" in the message to address them. Also instead of Hello or Hi use "Namaskaram".

## Team Members

House Name : Shakti Compliers ( My house )
**Captain:** Jayanth Pappaiah
**Total:** 62 team members (including Captain)
📋 **Complete team member details with Slack User IDs:** See `shakti-compliers-members.md`

--- 
Other houses details in : 
Karma Debuggers : `karma-debuggers-members.md`
Akashic Warriors : `akashic-warriors-members.md`
Zen Coders: `zen-coders-members.md`


### GOAL 
Our goal is to ensure everyone or as many as possible in the team partcipates in the games and we win the house cup

## Points to note :
- as part of achieving the goal i will be asking you the AI to do different tasks which might involve making MCP calls to slack. Reading messages are fine but If i ask you to send message through slack MCP, ensure to first ask me and only when i give you permission, make the MCP call.
- to see that we not only participate but also do well, we'll need to help the with necessary support to help them get good scores in the games.
For example : 
"Namaskaram anna, can you please join the game?"
"akka, did you get a chance to play the game ? do you need any help akka ?"
- **NEVER create documentation markdown files (like NEW_MCP_TOOLS.md, DOCUMENTATION.md, etc.) unless explicitly asked to do so.**

---

# 🤖 AUTOMATION BLUEPRINT - Game Participation Tracking

## 📋 Strategy Overview

**Objective:** Maximize Shakti Compliers participation by:
1. Sending pre-game reminders 2-4 hours before unlock (on manual command)
2. Monitoring real-time participation during game window
3. Sending nudges to non-participants during active game period (on manual command)

---

## 🔌 API Endpoints Reference

### Base URL
```
https://all-hearts-2025-games.netlify.app
```

### Critical Endpoints

#### 1. Game Timing Check
```bash
GET /api/game-timings
```
**Returns:** Array of game schedules with start/end times
**Use:** Check when games unlock and end

#### 2. Game Session Status (Per Game)
```bash
# Crossword
GET /api/games/crossword/sessions

# Wordle
GET /api/games/wordle/sessions

# Typing
GET /api/games/typing/sessions

# Sudoku
GET /api/games/sudoku/sessions

# Memory
GET /api/games/memory/sessions
```

**Returns:** Array of all player sessions
**Use:** Track who has played and who hasn't

---

## 🎯 Game Schedule (IST Times)

| Game | Start Time (IST) | End Time (IST) | Duration | Status |
|------|------------------|----------------|----------|--------|
| **Crossword** | Nov 15, 3:25 PM | Nov 15, 5:00 PM | 1h 35m | ⏰ ENDED |
| **Wordle** | Nov 15, 7:30 PM | Nov 17, 5:00 PM | ~46 hours | ⏰ ENDED |
| **Typing** | Nov 19, 2:30 PM | Nov 19, 5:00 PM | 2h 30m | 🔥 UPCOMING |
| **Sudoku** | Nov 24, 7:30 PM | Nov 24, 7:50 PM | 20 min | 🔒 LOCKED |
| **Memory** | Nov 27, 7:30 PM | Nov 27, 7:50 PM | 20 min | 🔒 LOCKED |

---

## 📊 Participation Tracking Logic

### Step 1: Fetch All Sessions for a Game
```bash
curl -s "https://all-hearts-2025-games.netlify.app/api/games/{GAME}/sessions" | python3 -m json.tool
```

### Step 2: Filter for Shakti Compliers Members
```python
# Filter sessions by house name
shakti_sessions = [s for s in sessions if "Shakti Compliers" in s.get("house", "")]
```

**⚠️ IMPORTANT:** House name in database is `"Shakti Compliers "` (with trailing space!)

### Step 3: Extract Participant Emails
```python
# Get list of emails who have played
played_emails = [s["playerEmail"] for s in shakti_sessions if s.get("completed") == True]
```

### Step 4: Compare Against Team List
```python
# All team member emails (62 total)
all_team_emails = [
    "jayanth.pappaiah@sadhguru.org",
    "abhishek.mv@sadhguru.org",
    # ... (full list from team members section above)
]

# Find who hasn't played yet
not_played = [email for email in all_team_emails if email not in played_emails]
```

---

## 🔍 Quick Check Commands

### Check Typing Game Participation (Example)
```bash
# Get all typing sessions
curl -s "https://all-hearts-2025-games.netlify.app/api/games/typing/sessions" | \
python3 -c "
import json, sys
sessions = json.load(sys.stdin)
shakti = [s for s in sessions if 'Shakti Compliers' in s.get('house', '')]
print(f'Shakti Compliers participants: {len(shakti)}/62')
for s in shakti:
    print(f\"  - {s['playerName']} ({s['playerEmail']}): Score {s.get('score', 'N/A')}\")
"
```

### Get Non-Participants List
```bash
# Save this as a script for easy reuse
curl -s "https://all-hearts-2025-games.netlify.app/api/games/typing/sessions" | \
python3 -c "
import json, sys

# Fetch sessions
sessions = json.load(sys.stdin)
played = [s['playerEmail'] for s in sessions if 'Shakti Compliers' in s.get('house', '')]

# Team emails
team = [
    'jayanth.pappaiah@sadhguru.org', 'abhishek.mv@sadhguru.org',
    'amit.jangid@sadhguru.org', 'ankojubhanu.prakash@sadhguru.org',
    # ... add all 62 emails
]

# Find non-participants
not_played = [e for e in team if e not in played]
print(f'Not yet played: {len(not_played)}/62')
for email in not_played:
    print(f'  - {email}')
"
```

---

## 📅 Pre-Game Reminder Workflow

### Timing: 2-4 hours before game unlock

#### For Typing Competition (Nov 19, 2:30 PM IST):
#### Message Template (Male):
```
Namaskaram anna! 🙏

Just a heads up - our next All Hearts game opens today at [TIME].

⏰ Game Window: [START TIME] - [END TIME]

Would be great to have you participate if you get a chance anna. Every bit helps our house score! 🌟

Let me know if you need any help.
```

#### Message Template (Female):
```
Namaskaram akka! 🙏

Just a heads up - our next All Hearts game opens today at [TIME].

⏰ Game Window: [START TIME] - [END TIME]

Would be great to have you participate if you get a chance akka. Every bit helps our house score! 🌟 

Let me know if you need any help.
```

---

## 🔔 During-Game Nudge Workflow

### Timing: Every 30-60 minutes during active game window

### Step 1: Check Current Participation
```bash
# Run this command to get current stats
curl -s "https://all-hearts-2025-games.netlify.app/api/games/typing/sessions" | \
python3 -m json.tool | grep -A5 "Shakti Compliers"
```

### Step 2: Identify Non-Participants
Use the script above to get list of emails who haven't played

### Step 3: Send Nudge Messages

#### Nudge Template (Male) - First Hour:
```
Namaskaram anna! 🎮

Just checking in - have you had a chance to play today's All Hearts game yet? 😊

⏰ Time remaining: [X hours Y minutes]
🏆 Current participation: [N]/62 Shakti Compliers members

We're all doing our part for the house! If you need any help or have questions, feel free to reach out anna. 🤝

Every contribution counts! 💪⚡
```

#### Nudge Template (Female) - First Hour:
```
Namaskaram akka! 🎮

Just checking in - have you had a chance to play today's All Hearts game yet? 😊

⏰ Time remaining: [X hours Y minutes]
🏆 Current participation: [N]/62 Shakti Compliers members

We're all doing our part for the house! If you need any help or have questions, feel free to reach out akka. 🤝

Every contribution counts! 💪⚡
```

#### Gentle Reminder (Final 30 minutes):
```
Namaskaram anna! 🙏

Quick heads up - only 30 minutes left for today's All Hearts game! ⏰

⏰ Ends at: [END TIME]
🎯 Still time to participate!

If you get a chance, it would be wonderful to have your contribution for Shakti Compliers! Every bit helps us in our journey to the house cup! 🏆✨

No pressure though - just wanted to keep you in the loop! 😊

Shakti Compliers! ⚡
```

---

## 🎯 Automation Checklist

### Pre-Game (2-4 hours before):
- [ ] Check `/api/game-timings` to confirm unlock time
- [ ] Prepare reminder messages (gender-specific)
- [ ] Send DM to all 64 team members via Slack
- [ ] Post reminder in `shakti-compliers` Slack channel

### During Game (Every 30-60 min):
- [ ] Fetch current sessions from API
- [ ] Filter for Shakti Compliers participants
- [ ] Calculate participation rate (X/64)
- [ ] Identify non-participants
- [ ] Send nudge messages to non-participants
- [ ] Update team in Slack channel with stats

### Post-Game (After end time):
- [ ] Fetch final sessions
- [ ] Calculate final participation rate
- [ ] Identify top performers
- [ ] Share results and thank participants
- [ ] Note non-participants for next game

---

## 📝 Monitoring Script Template

```python
#!/usr/bin/env python3
import requests
import json
from datetime import datetime

# Configuration
GAME = "typing"  # Change per game
API_BASE = "https://all-hearts-2025-games.netlify.app"
HOUSE = "Shakti Compliers "  # Note the trailing space!

# Team emails (all 62)
TEAM_EMAILS = [
    "jayanth.pappaiah@sadhguru.org",
    "abhishek.mv@sadhguru.org",
    # ... add all 62 emails here
]

def get_participation():
    """Fetch current participation status"""
    url = f"{API_BASE}/api/games/{GAME}/sessions"
    response = requests.get(url)
    sessions = response.json()
    
    # Filter for our house
    shakti_sessions = [s for s in sessions if HOUSE in s.get("house", "")]
    
    # Get emails of participants (case-insensitive)
    played_emails = [s["playerEmail"].lower() for s in shakti_sessions]
    
    # Find non-participants (case-insensitive comparison)
    not_played = [e for e in TEAM_EMAILS if e.lower() not in played_emails]
    
    return {
        "total_team": len(TEAM_EMAILS),
        "played": len(played_emails),
        "not_played": len(not_played),
        "participation_rate": f"{len(played_emails)/len(TEAM_EMAILS)*100:.1f}%",
        "played_emails": played_emails,
        "not_played_emails": not_played,
        "sessions": shakti_sessions
    }

def print_status():
    """Print current status"""
    status = get_participation()
    print(f"\n{'='*60}")
    print(f"Shakti Compliers - {GAME.upper()} Game Status")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')}")
    print(f"{'='*60}")
    print(f"Participation: {status['played']}/{status['total_team']} ({status['participation_rate']})")
    print(f"\nNot yet played ({len(status['not_played_emails'])}):")
    for email in status['not_played_emails']:
        print(f"  - {email}")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    print_status()
```

---

## 🚨 Critical Reminders

### For Short-Duration Games (Sudoku & Memory - 20 min only!):

**Pre-Game Reminder:** Send 1 hour before AND 15 minutes before
**During Game:** Check every 5 minutes
**Urgency Level:** MAXIMUM - No time to waste!

#### Ultra-Urgent Template (15 min before):
```
🚨 URGENT - Sudoku game starts in 15 MINUTES! 🚨

⏰ Start: 7:30 PM IST
⏰ End: 7:50 PM IST
⚡ Duration: ONLY 20 MINUTES!

Be ready at your computer at 7:30 PM sharp!
No time to waste - every second counts!

Shakti Compliers - let's do this! 💪⚡
```

---

## 🎮 Quick Commands for Each Game

### Typing Competition (Nov 19)
```bash
# Check participation
curl -s "https://all-hearts-2025-games.netlify.app/api/games/typing/sessions" | python3 -m json.tool | grep -c "Shakti Compliers"
```

### Sudoku (Nov 24)
```bash
# Check participation
curl -s "https://all-hearts-2025-games.netlify.app/api/games/sudoku/sessions" | python3 -m json.tool | grep -c "Shakti Compliers"
```

### Memory (Nov 27)
```bash
# Check participation
curl -s "https://all-hearts-2025-games.netlify.app/api/games/memory/sessions" | python3 -m json.tool | grep -c "Shakti Compliers"
```

---

## 🎯 Success Metrics

**Target:** 90%+ participation (56+/62 members)
**Minimum:** 75% participation (47+/62 members)

**Current Status:**
- Crossword: ~3 members played
- Wordle: ~2 members played
- **Participation Rate: ~5-8% (VERY LOW!)**

**Action Required:** Aggressive reminders and nudges for remaining games!

---

**Blueprint Last Updated:** November 18, 2025 at 9:07 PM IST  
**Next Game:** Typing Competition - November 19, 2025 at 2:30 PM IST