/**
 * Types for All Hearts 2025 Games API
 */

export type GameType = "crossword" | "wordle" | "typing" | "sudoku" | "memory";

export type HouseName =
  | "Akashic Warriors"
  | "Karma Debuggers " // Note: trailing space is intentional!
  | "Zen Coders"
  | "Shakti Compliers " // Note: trailing space is intentional!
  | "dummy";

export interface GameTiming {
  game: GameType;
  start: string; // ISO 8601 timestamp
  end: string; // ISO 8601 timestamp
}

export interface GameSession {
  id: string;
  playerEmail: string;
  playerName: string;
  house: string;
  completed: boolean;
  gameType?: GameType;
  startTime?: string;
  endTime?: string;
  // Game-specific fields
  score?: number;
  bestScore?: number;
  bestAccuracy?: number;
  duration?: number;
  timeTaken?: number;
  wpm?: number;
  accuracy?: number;
  attempts?: number;
  totalWords?: number;
  correctWords?: number;
  correctAnswers?: number;
  wordsSolved?: number;
}

// Typing game specific types
export interface TypingGameSubmission {
  id?: string;
  playerEmail: string;
  house: string;
  name: string;
  startTime: string;
  endTime?: string;
  bestRound: {
    score: number;
    accuracy: number;
    duration: number;
    wpm: number;
  };
  rounds?: Array<{
    score: number;
    accuracy: number;
    duration: number;
    wpm: number;
    timestamp?: string;
  }>;
}

export interface TypingSessionCreate {
  playerEmail: string;
  house: string;
  playerName: string;
}

export interface TypingSessionUpdate {
  id: string;
  playerEmail: string;
  house: string;
  name: string;
  startTime: string;
  endTime: string;
  bestRound: {
    score: number;
    accuracy: number;
    duration: number;
    wpm: number;
  };
  rounds?: Array<{
    score: number;
    accuracy: number;
    duration: number;
    wpm: number;
    timestamp?: string;
  }>;
}

// Crossword game specific types
export interface CrosswordGameSubmission {
  playerName: string;
  playerEmail: string;
  house: string;
  gameType: "crossword";
  totalWords: number;
  correctWords?: number;
  timeTaken?: number;
  completed?: boolean;
  startTime?: string;
  endTime?: string;
}

export interface CrosswordSessionCreate {
  playerEmail: string;
  house: string;
  playerName: string;
  gameType: "crossword";
  totalWords: number;
}

export interface CrosswordSessionUpdate {
  id: string;
  playerEmail: string;
  house: string;
  name: string;
  startTime: string;
  endTime: string;
  totalWords: number;
  correctAnswers: number;
  completed: boolean;
}

// Wordle game specific types
export interface WordleGameSubmission {
  playerName: string;
  playerEmail: string;
  house: string;
  gameType: "wordle";
  attempts?: number;
  solved?: boolean;
  guesses?: string[];
}

export interface WordleSessionCreate {
  playerEmail: string;
  house: string;
  playerName: string;
  gameType: "wordle";
}

export interface WordleSessionUpdate {
  id: string;
  playerEmail: string;
  house: string;
  name: string;
  startTime: string;
  endTime: string;
  attemptsUsed: number;
  solved: boolean;
  score: number;
  greens?: number;
  yellows?: number;
  wordsSolved: number;
}

// Sudoku game specific types
export interface SudokuGameSubmission {
  playerName: string;
  playerEmail: string;
  house: string;
  gameType: "sudoku";
  difficulty?: string;
  timeTaken?: number;
  completed?: boolean;
}

// Memory game specific types
export interface MemoryGameSubmission {
  playerName: string;
  playerEmail: string;
  house: string;
  gameType: "memory";
  moves?: number;
  timeTaken?: number;
  completed?: boolean;
}
