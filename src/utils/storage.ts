import { Category, Difficulty, GameInfo } from "types";

export const loadDifficulty = () => {
  const storageDifficultyItem = localStorage.getItem(
    "difficulty"
  ) as Difficulty;
  const difficulty = storageDifficultyItem || "easy";

  return difficulty;
};

export const loadCategory = () => {
  const storageCategoryItem = localStorage.getItem("category") as Category;
  const category = storageCategoryItem || "animals";

  return category;
};

export const getItem = (key: string) => {
  const item = localStorage.getItem(key);

  return item;
};

export const saveItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getHistory = () => {
  const savedItems = getItem("history");

  if (savedItems) return JSON.parse(savedItems) as GameInfo[];
  return [];
};

export const storeHistoryItem = (item: GameInfo) => {
  const history = getHistory();

  if (history.length > 0) {
    const stringifiedItem = JSON.stringify([item, ...history]);
    localStorage.setItem("history", stringifiedItem);
  } else {
    saveItem("history", JSON.stringify([item]));
  }
};
