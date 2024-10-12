import { cards } from "data/cards";
import { useEffect, useMemo, useState } from "react";
import { useGameStore } from "store";
import { CardWithId } from "types";
import { generateCardPairs, shuffleDeck } from "utils/deckUtils";

const useGameScreen = () => {
  const {
    addMatchedPair,
    category,
    clearRevealedTiles,
    difficulty,
    increaseAttempts,
    revealTile,
    revealedTiles,
    matchedPairs,
    timer,
    updateTimer,
  } = useGameStore();

  const [attemptsFroze, setAttemptsFroze] = useState(false);

  const deck = useMemo(
    () => cards.filter((el) => el.type === category),
    [category]
  );

  const numOfTiles =
    difficulty === "easy" ? 8 : difficulty === "medium" ? 16 : 24;

  const pairsNumber = numOfTiles / 2;

  const tailoredDeck = useMemo(
    () => generateCardPairs(deck, pairsNumber),
    [deck, numOfTiles]
  );

  const shuffledDeck = useMemo(() => shuffleDeck(tailoredDeck), [tailoredDeck]);

  const onItemClick = (id: string) => {
    const shouldIncreaseAttempts = revealedTiles.length === 0 && !attemptsFroze;

    if (shouldIncreaseAttempts) increaseAttempts();
    if (revealedTiles.length == 2) return;

    revealTile(id);
  };

  const isActive = ({ id, value }: Pick<CardWithId, "id" | "value">) => {
    const itemRevealed = revealedTiles.includes(id);
    const itemMatched = matchedPairs.includes(value);

    return itemRevealed || itemMatched;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (matchedPairs.length !== pairsNumber) updateTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (revealedTiles.length === 2) {
      const [firstCard, secondCard] = shuffledDeck.filter((el) =>
        revealedTiles.includes(el.id)
      );

      if (firstCard.value === secondCard.value) {
        addMatchedPair(firstCard.value);
        setAttemptsFroze(true);
      } else {
        setAttemptsFroze(false);
      }

      const timeout = setTimeout(() => {
        clearRevealedTiles();
      }, 1000);

      return () => clearTimeout(timeout);
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
