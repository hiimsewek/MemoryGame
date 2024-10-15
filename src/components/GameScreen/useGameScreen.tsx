import { useCallback, useEffect, useMemo, useState } from "react";
import { cards } from "data/cards";
import { useGameStore } from "store";
import { CardWithId } from "types";
import { prepareCardSet } from "utils/deckUtils";

const useGameScreen = () => {
  const {
    addGameToHistory,
    attempts,
    addMatchedPair,
    category,
    clearRevealedTiles,
    deck,
    difficulty,
    increaseAttempts,
    revealTile,
    revealedTiles,
    matchedPairs,
    setDeck,
    startDate,
    timer,
    updateTimer,
  } = useGameStore();

  const [attemptsFroze, setAttemptsFroze] = useState(false);

  const categoryCardList = useMemo(
    () => cards.filter((el) => el.type === category),
    [category]
  );

  const numOfTiles =
    difficulty === "easy" ? 8 : difficulty === "medium" ? 16 : 24;

  const pairsNumber = numOfTiles / 2;

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

  // prepare new card set every game
  useEffect(() => {
    if (attempts === 0) {
      const preparedCardSet = prepareCardSet(categoryCardList, pairsNumber);
      setDeck(preparedCardSet);
    }
  }, [attempts, categoryCardList, pairsNumber, setDeck]);

  // update timer
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldUpdateTimer =
        startDate && matchedPairs.length !== pairsNumber;

      if (shouldUpdateTimer) updateTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, startDate, matchedPairs, pairsNumber, updateTimer]);

  // pair matching functionality
  useEffect(() => {
    if (revealedTiles.length === 2) {
      const [firstCard, secondCard] = deck.filter((el) =>
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
  }, [revealedTiles, addMatchedPair, clearRevealedTiles, deck]);

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
    onItemClick,
    isActive,
    gameFinished,
  };
};

export default useGameScreen;
