import { useCallback, useEffect, useMemo, useState } from "react";
import { cards } from "data/cards";
import { useGameStore } from "store";
import { CardWithId } from "types";
import { generateCardPairs, shuffleDeck } from "utils/deckUtils";

const useGameScreen = () => {
  const {
    addGameToHistory,
    attempts,
    addMatchedPair,
    category,
    clearRevealedTiles,
    difficulty,
    increaseAttempts,
    revealTile,
    revealedTiles,
    matchedPairs,
    startDate,
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
    [deck, pairsNumber]
  );

  const shuffledDeck = useMemo(() => shuffleDeck(tailoredDeck), [tailoredDeck]);

  const onItemClick = (id: string) => {
    if (!startDate) return;

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
      const shouldUpdateTimer =
        startDate && matchedPairs.length !== pairsNumber;

      if (shouldUpdateTimer) updateTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, startDate, matchedPairs, pairsNumber, updateTimer]);

  useEffect(() => {
    if (revealedTiles.length === 2) {
      const [firstCard, secondCard] = shuffledDeck.filter((el) =>
        revealedTiles.includes(el.id)
      );

      let timeout = undefined;

      if (firstCard.value === secondCard.value) {
        addMatchedPair(firstCard.value);
        setAttemptsFroze(true);
        clearRevealedTiles();
      } else {
        setAttemptsFroze(false);

        timeout = setTimeout(() => {
          clearRevealedTiles();
        }, 1000);
      }

      return () => clearTimeout(timeout);
    }
  }, [revealedTiles, addMatchedPair, clearRevealedTiles, shuffledDeck]);

  const gameFinished = useMemo(
    () => matchedPairs.length === pairsNumber,
    [matchedPairs, pairsNumber]
  );

  const gameFinishHandler = useCallback(() => {
    const historyItem = {
      date: startDate!,
      duration: timer,
      attempts,
      difficulty,
    };

    addGameToHistory(historyItem);
  }, [difficulty, timer, startDate, attempts, addGameToHistory]);

  useEffect(() => {
    if (gameFinished) {
      gameFinishHandler();
    }
  }, [gameFinishHandler, gameFinished]);

  return {
    difficulty,
    onItemClick,
    isActive,
    shuffledDeck,
    gameFinished,
  };
};

export default useGameScreen;
