import { Category, Difficulty, HistoryItem } from "types";

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

  if (item && key === "history") {
    return JSON.parse(item) as HistoryItem[];
  }

  return item;
};

export const saveItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const addHistoryItem = (item: HistoryItem) => {
  const savedItems = getItem("history");

  if (savedItems && Array.isArray(savedItems)) {
    const stringifiedItem = JSON.stringify([item, ...savedItems]);
    localStorage.setItem("history", stringifiedItem);
  } else {
    saveItem("history", JSON.stringify([item]));
  }
};
