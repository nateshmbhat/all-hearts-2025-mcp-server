/**
 * API Client for All Hearts 2025 Games
 */

import axios, { AxiosInstance } from "axios";
import {
  GameType,
  GameTiming,
  GameSession,
  TypingGameSubmission,
  TypingSessionCreate,
  TypingSessionUpdate,
  CrosswordGameSubmission,
  CrosswordSessionCreate,
  CrosswordSessionUpdate,
  WordleGameSubmission,
  WordleSessionCreate,
  WordleSessionUpdate,
  SudokuGameSubmission,
  MemoryGameSubmission,
} from "./types.js";

const BASE_URL = "https://all-hearts-2025-games.netlify.app";

export class AllHeartsAPIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  /**
   * Get game timings for all games
   */
  async getGameTimings(): Promise<GameTiming[]> {
    const response = await this.client.get<GameTiming[]>("/api/game-timings");
    return response.data;
  }

  /**
   * Get sessions for a specific game
   */
  async getGameSessions(game: GameType): Promise<GameSession[]> {
    const response = await this.client.get<GameSession[]>(
      `/api/games/${game}/sessions`
    );
    return response.data;
  }

  /**
   * Submit typing game session (legacy - for backward compatibility)
   */
  async submitTypingGame(
    submission: TypingGameSubmission
  ): Promise<GameSession> {
    const response = await this.client.patch<GameSession>(
      "/api/games/typing/sessions",
      submission
    );
    return response.data;
  }

  /**
   * Create a new typing game session (Step 1: POST)
   */
  async createTypingSession(data: TypingSessionCreate): Promise<GameSession> {
    const response = await this.client.post<GameSession>(
      "/api/games/typing/sessions",
      data
    );
    return response.data;
  }

  /**
   * Update an existing typing game session (Step 2: PATCH)
   */
  async updateTypingSession(data: TypingSessionUpdate): Promise<GameSession> {
    const response = await this.client.patch<GameSession>(
      "/api/games/typing/sessions",
      data
    );
    return response.data;
  }

  /**
   * Create/submit crossword game session (legacy - for backward compatibility)
   */
  async submitCrosswordGame(
    submission: CrosswordGameSubmission
  ): Promise<GameSession> {
    const response = await this.client.post<GameSession>(
      "/api/games/crossword/sessions",
      submission
    );
    return response.data;
  }

  /**
   * Create a new Crossword game session (Step 1: POST)
   */
  async createCrosswordSession(
    data: CrosswordSessionCreate
  ): Promise<GameSession> {
    const response = await this.client.post<GameSession>(
      "/api/games/crossword/sessions",
      data
    );
    return response.data;
  }

  /**
   * Update an existing Crossword game session (Step 2: PATCH)
   */
  async updateCrosswordSession(
    data: CrosswordSessionUpdate
  ): Promise<GameSession> {
    const response = await this.client.patch<GameSession>(
      "/api/games/crossword/sessions",
      data
    );
    return response.data;
  }

  /**
   * Create/submit wordle game session (legacy - for backward compatibility)
   */
  async submitWordleGame(
    submission: WordleGameSubmission
  ): Promise<GameSession> {
    const response = await this.client.post<GameSession>(
      "/api/games/wordle/sessions",
      submission
    );
    return response.data;
  }

  /**
   * Create a new Wordle game session (Step 1: POST)
   */
  async createWordleSession(data: WordleSessionCreate): Promise<GameSession> {
    const response = await this.client.post<GameSession>(
      "/api/games/wordle/sessions",
      data
    );
    return response.data;
  }

  /**
   * Update an existing Wordle game session (Step 2: PATCH)
   */
  async updateWordleSession(data: WordleSessionUpdate): Promise<GameSession> {
    const response = await this.client.patch<GameSession>(
      "/api/games/wordle/sessions",
      data
    );
    return response.data;
  }

  /**
   * Create/submit sudoku game session
   */
  async submitSudokuGame(
    submission: SudokuGameSubmission
  ): Promise<GameSession> {
    const response = await this.client.post<GameSession>(
      "/api/games/sudoku/sessions",
      submission
    );
    return response.data;
  }

  /**
   * Create/submit memory game session
   */
  async submitMemoryGame(
    submission: MemoryGameSubmission
  ): Promise<GameSession> {
    const response = await this.client.post<GameSession>(
      "/api/games/memory/sessions",
      submission
    );
    return response.data;
  }

  /**
   * Get crossword puzzle data
   */
  async getCrosswordPuzzle(): Promise<any> {
    const response = await this.client.get("/api/games/crossword");
    return response.data;
  }

  /**
   * Get wordle dictionary
   */
  async getWordleDictionary(): Promise<string[]> {
    const response = await this.client.get<string[]>(
      "/api/games/wordle/dictionary"
    );
    return response.data;
  }
}
