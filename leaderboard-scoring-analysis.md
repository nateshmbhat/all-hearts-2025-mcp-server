# 🎯 All Hearts Leaderboard Scoring Analysis

## 📊 Overview
This document breaks down the exact mathematical formulas used to calculate scores and rankings in the All Hearts 2025 competition.

---

## 🏠 House Scoring System

### Formula Components

#### 1. **Session Score Calculation** (`o` function)

**For Typing Game:**
```javascript
sessionScore = clamp((bestScore / 200) * 100, 0, 100)
// Where clamp ensures the value stays between 0-100
```
- **Max Score**: 200 points = 100% session score
- **Example**: 
  - 200 WPM with 100% accuracy → 100% session score
  - 100 WPM with 50% accuracy → 50% session score

**For Crossword/Wordle:**
```javascript
accuracyScore = clamp((correctAnswers / totalWords) * 100, 0, 100)
timeScore = clamp((300 - duration) / 300 * 100, 0, 100)

sessionScore = clamp((0.2 * accuracyScore) + (0.2 * timeScore), 0, 100)
```
- **Accuracy Weight**: 20%
- **Time Weight**: 20%
- **Total Weight**: 40% (rest is participation)
- **Ideal Duration**: 0 seconds (unrealistic) = 100% time score
- **Max Duration**: 300 seconds = 0% time score

---

#### 2. **House Points Formula**

```javascript
averageSessionScore = sum(allSessionScores) / totalSessions

participationRatio = houseParticipants / maxParticipantsAcrossAllHouses

housePoints = (0.4 * averageSessionScore) + (0.4 * participationRatio * 100)
```

**Breakdown:**
- **40%** from average session performance
- **40%** from participation rate (relative to the house with most participants)
- **Total**: 80% of possible points (20% seems unused)

**Key Insight**: Participation is weighted EQUALLY to performance!

---

### Example Calculation

**Scenario: Shakti Compliers in Typing Game**
- 30 members participated (out of 62)
- Average session score: 75/100
- Other house with most participants: 40 members

```javascript
// Average session score component
performancePoints = 0.4 * 75 = 30 points

// Participation component
participationRatio = 30 / 40 = 0.75
participationPoints = 0.4 * 0.75 * 100 = 30 points

// Total house points for typing
totalPoints = 30 + 30 = 60 points
```

---

## 👤 Individual Player Scoring

### Player Score Extraction (`f` function)

**For Typing:**
```javascript
score = bestScore ?? score ?? 0
accuracy = bestAccuracy ?? bestRound?.accuracy
duration = bestRound?.duration ?? duration

// Accuracy normalized to percentage (0-100)
if (accuracy > 1) {
    solvedCount = Math.round(accuracy)  // Already a percentage
} else {
    solvedCount = Math.round(accuracy * 100)  // Convert decimal to percentage
}
```

**For Crossword/Wordle:**
```javascript
score = rawScore

// Special handling for Wordle
if (gameType === "wordle") {
    score = Math.round((score ?? 0) / 2000 * 100)
    // This normalizes Wordle scores to 0-100 scale
    // Max score appears to be ~2000 points
}

duration = duration (if >= 0, else undefined)
solvedCount = wordsSolved
```

---

### Best Score Selection (`y` function)

When a player has multiple sessions, the best one is selected:

```javascript
isBetter = (newScore > oldScore) || 
           (newScore === oldScore && newDuration < oldDuration)
```

**Tiebreaker**: If scores are equal, shorter duration wins.

---

### Player Ranking (`C` function)

**Total Score:**
```javascript
totalScore = (crosswordScore ?? 0) + (wordleScore ?? 0) + (typingScore ?? 0)
```

**Ranking Priority:**
1. **Total Score** (primary)
2. **Crossword Score** (tiebreaker #1)
3. **Wordle Score** (tiebreaker #2)
4. **Typing Score** (tiebreaker #3)
5. **Total Duration** (final tiebreaker - lower is better)

```javascript
totalDuration = (crosswordDuration ?? ∞) + (wordleDuration ?? ∞) + (typingDuration ?? ∞)
```

---

## 🎮 Game-Specific Scoring

### Typing Game
- **Max Score**: 200 points
- **Components**: WPM + Accuracy
- **Session Score Formula**: `(score / 200) * 100`

### Crossword
- **Components**: 
  - Correct words (20% weight)
  - Time taken (20% weight, max 300s)
- **Session Score Formula**: `0.2 * (correct/total * 100) + 0.2 * ((300-time)/300 * 100)`

### Wordle
- **Raw Score**: Up to ~2000 points
- **Normalized Score**: `(rawScore / 2000) * 100`
- **Components**:
  - Attempts used
  - Words solved
  - Greens/yellows (letter accuracy)
- **Session Score Formula**: Same as Crossword

---

## 📈 Key Insights for Strategy

### 🎯 For House Victory:

1. **Participation is CRITICAL**
   - Worth 40% of house points
   - Even low-scoring participants help!
   
2. **Relative Participation Matters**
   - Your participation is compared to the house with MOST participants
   - If max house has 40 participants and you have 30 → you get 75% of participation points
   
3. **Average Performance Matters**
   - Worth 40% of house points
   - One player scoring 100 and one scoring 0 = 50 average
   - Better to have consistent good scores than few excellent ones

### 🏆 For Individual Ranking:

1. **Play All Games**
   - Total score is sum of all three games
   - Missing a game = 0 points for that game

2. **Prioritize High Scores First**
   - Duration only matters as tiebreaker
   - Better to score 90 in 200s than 85 in 100s

3. **If Tied on Score**
   - Crossword time is checked first
   - Then Wordle time
   - Then Typing time
   - Optimize time in that priority order

---

## 🧮 Optimal Strategy Calculator

### To Maximize House Points:

**Current Status Check:**
```python
# What we need to know
our_participants = 30
max_house_participants = 40  # Highest among all houses
our_avg_score = 75

# Calculate current points
performance_points = 0.4 * our_avg_score  # = 30
participation_points = 0.4 * (our_participants / max_house_participants) * 100  # = 30
total_house_points = performance_points + participation_points  # = 60
```

**To Gain 10 More Points:**

Option A: Increase participation
```python
# How many more participants needed?
target_points = 70
current_perf = 30  # Keep same
needed_participation_points = 70 - 30  # = 40

# Solve: 0.4 * (X / 40) * 100 = 40
# X = 40 participants needed (10 more people)
```

Option B: Increase average score
```python
# What average score needed?
current_participation = 30  # Keep same
needed_performance_points = 70 - 30  # = 40

# Solve: 0.4 * X = 40
# X = 100 average score needed (increase by 25 points)
```

**Conclusion**: Getting 10 more people to participate is MUCH easier than raising average score by 25 points!

---

## 🎯 Practical Recommendations

### For Shakti Compliers:

1. **Primary Goal**: Get 56+ members to participate (90% participation)
   - This alone could be worth 20-30 house points
   
2. **Secondary Goal**: Help low performers improve slightly
   - Going from 30 → 50 average score = +8 house points
   
3. **Don't Neglect Anyone**: 
   - A player scoring 20 is better than no player
   - Every participant helps the participation ratio

### Message Strategy:

**High Priority (Non-participants):**
- Focus on ease of participation
- Emphasize that ANY score helps
- "Even 2 minutes of your time helps our house!"

**Medium Priority (Low scorers):**
- Offer tips to improve
- Share best practices
- "Let's get you from 40 to 60 points!"

**Low Priority (High scorers):**
- They're already contributing well
- Maybe ask them to help others

---

## 📊 Quick Reference Table

| Metric | Weight | Max Points | Notes |
|--------|--------|------------|-------|
| House Avg Performance | 40% | 40 | Based on session scores |
| House Participation | 40% | 40 | Relative to highest house |
| **Total House Points** | **80%** | **80** | Per game |
| Individual Game Score | 100% | Varies | Sum of all games |
| Time (as tiebreaker) | N/A | N/A | Lower is better |

---

## 🔍 Code Functions Reference

- `o(e)`: Calculate session score (0-100) from raw game data
- `a(sessions)`: Calculate house points for one game
- `N()`: Calculate all houses' total points across all games
- `f(e)`: Extract best score/duration from a session
- `y(existing, new)`: Select better score between two sessions
- `C(filterHouse)`: Calculate individual player rankings

---

**Analysis Date**: November 21, 2025  
**Games Analyzed**: Crossword, Wordle, Typing  
**Status**: Current (Typing game upcoming)


