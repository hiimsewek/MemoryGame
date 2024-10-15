import { create } from "zustand";
import { Action, State } from "./Game.types";
import {
  getHistory,
  loadCategory,
  loadDifficulty,
  saveItem,
  storeHistoryItem,
} from "utils/storage";

const initialState: State = {
  attempts: 0,
  revealedTiles: [],
  matchedPairs: [],
  timer: 0,
  startDate: null,
  gameHistory: getHistory(),
  difficulty: loadDifficulty(),
  category: loadCategory(),
};

const useGameStore = create<State & Action>((set) => ({
  ...initialState,

  increaseAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),

  revealTile: (id: string) =>
    set((state) => ({ revealedTiles: [...state.revealedTiles, id] })),

  clearRevealedTiles: () => set({ revealedTiles: [] }),

  addMatchedPair: (pairValue) =>
    set((state) => ({
      matchedPairs: [...state.matchedPairs, pairValue],
    })),

  updateTimer: () => set((state) => ({ timer: state.timer + 1 })),

  startNewGame: () =>
    set({
      attempts: 0,
      revealedTiles: [],
      matchedPairs: [],
      timer: 0,
      startDate: new Date(),
    }),

  addGameToHistory: (game) => {
    set((state) => ({ gameHistory: [game, ...state.gameHistory] }));
    storeHistoryItem(game);
  },

  setDifficulty: (difficulty) => {
    set({ difficulty });
    saveItem("difficulty", difficulty);
  },

  setCategory: (category) => {
    set({ category });
    saveItem("category", category);
  },
}));

export default useGameStore;
