export type Category = "animals" | "fruits" | "sports";

export type Card = {
  type: Category;
  image: string;
  value: string;
};

export type CardWithId = Card & {
  id: string;
};

export type Difficulty = "easy" | "medium" | "hard";

export type GameInfo = {
  attempts: string;
  duration: number;
  date: Date;
  difficulty: Difficulty;
}[];

export type HistoryItem = {
  time: number;
  date: Date;
  attempts: number;
  difficulty: Difficulty;
};
