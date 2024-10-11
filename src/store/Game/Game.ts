import { create } from "zustand";
import { Action, State } from "./Game.types";
import { loadCategory, loadDifficulty } from "utils/settingsLoader";

const initialState: State = {
  attempts: 0,
  revealedTiles: [],
  matchedPairs: [],
  timer: 0,
  startDate: null,
  gameHistory: [],
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
    set({ ...initialState, attempts: 1, startDate: new Date() }),

  addGameToHistory: (game) =>
    set((state) => ({ gameHistory: [game, ...state.gameHistory] })),

  setDifficulty: (difficulty) => set({ difficulty }),

  setCategory: (category) => set({ category }),
}));

export default useGameStore;
