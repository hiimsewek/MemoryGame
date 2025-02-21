import { Card, CardWithId } from "types";
import { v4 as uuidv4 } from "uuid";

const getCardsWithIds = (cards: Card[]) =>
  cards.map((el) => ({ ...el, id: uuidv4() }));

export const generateCardPairs = (
  deck: Card[],
  pairsNumber: number
): CardWithId[] => {
  const randomImages = new Set();

  while (randomImages.size < pairsNumber) {
    const randIndex = Math.floor(Math.random() * deck.length);

    randomImages.add(deck[randIndex].image);
  }

  const filteredDeck = deck.filter((el) => randomImages.has(el.image));
  const pairs = [...filteredDeck, ...filteredDeck];

  const cardsWithIds = getCardsWithIds(pairs);

  return cardsWithIds;
};

export const shuffleDeck = (deck: CardWithId[]) => {
  const data = [...deck];

  for (let i = data.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = data[i];
    data[i] = data[j];
    data[j] = temp;
  }

  return data;
};

export const prepareCardSet = (deck: Card[], pairsNumber: number) => {
  const tailoredDeck = generateCardPairs(deck, pairsNumber);
  const shuffledDeck = shuffleDeck(tailoredDeck);

  return shuffledDeck;
};

export const unpackCategories = (deck: Card[]) => {
  const data = deck.map((el) => el.type);

  const uniqueCategories = new Set([...data]);

  return [...uniqueCategories];
};
