import { Category, Difficulty } from "types";

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
