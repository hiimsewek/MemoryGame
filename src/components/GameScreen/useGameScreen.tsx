import { cards } from "data/cards";
import { useEffect, useMemo } from "react";
import { useGameStore } from "store";
import { CardWithId } from "types";
import { generateCardPairs, shuffleDeck } from "utils/deckUtils";

const useGameScreen = () => {
  const {
    addMatchedPair,
    clearRevealedTiles,
    difficulty,
    category,
    revealTile,
    revealedTiles,
    matchedPairs,
  } = useGameStore();

  const deck = useMemo(
    () => cards.filter((el) => el.type === category),
    [category]
  );

  const numOfTiles =
    difficulty === "easy" ? 8 : difficulty === "medium" ? 16 : 24;

  const tailoredDeck = useMemo(
    () => generateCardPairs(deck, numOfTiles / 2),
    [deck, numOfTiles]
  );

  const shuffledDeck = useMemo(() => shuffleDeck(tailoredDeck), [tailoredDeck]);

  const onItemClick = (id: string) => {
    if (revealedTiles.length == 2) return;

    revealTile(id);
  };

  const isActive = ({ id, value }: Pick<CardWithId, "id" | "value">) => {
    const itemRevealed = revealedTiles.includes(id);
    const itemMatched = matchedPairs.includes(value);

    return itemRevealed || itemMatched;
  };

  useEffect(() => {
    if (revealedTiles.length === 2) {
      const [firstCard, secondCard] = shuffledDeck.filter((el) =>
        revealedTiles.includes(el.id)
      );

      if (firstCard.value === secondCard.value) addMatchedPair(firstCard.value);

      setTimeout(() => {
        clearRevealedTiles();
      }, 1000);
    }
  }, [revealedTiles, addMatchedPair, clearRevealedTiles, shuffledDeck]);

  return {
    difficulty,
    onItemClick,
    isActive,
    shuffledDeck,
  };
};

export default useGameScreen;
