import { CardWithId, Category, Difficulty, GameInfo } from "types";

export type State = {
  attempts: number;
  revealedTiles: string[];
  matchedPairs: string[];
  timer: number;
  startDate: Date | null;
  deck: CardWithId[];
  gameHistory: GameInfo[];
  difficulty: Difficulty;
  category: Category;
};

export type Action = {
  increaseAttempts: () => void;
  revealTile: (id: string) => void;
  clearRevealedTiles: () => void;
  addMatchedPair: (pairValue: string) => void;
  updateTimer: () => void;
  setDeck: (deck: CardWithId[]) => void;
  startNewGame: () => void;
  addGameToHistory: (game: GameInfo) => void;
  setDifficulty: (difficylty: Difficulty) => void;
  setCategory: (category: Category) => void;
};
