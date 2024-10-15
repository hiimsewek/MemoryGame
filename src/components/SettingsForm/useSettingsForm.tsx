import { cards } from "data/cards";
import { useState } from "react";
import { useGameStore } from "store";
import { Category, Difficulty } from "types";
import { unpackCategories } from "utils/deckUtils";

const useSettingsForm = () => {
  const {
    category,
    difficulty,
    setCategory,
    setDifficulty,
    startNewGame,
    timer,
  } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);
  const [modalActive, setModalActive] = useState(false);

  const categories = unpackCategories(cards);

  const onCategoryChange = (option: string) => {
    setSelectedCategory(option as Category);
  };

  const onDifficultyChange = (option: string) => {
    setSelectedDifficulty(option as Difficulty);
  };

  const closeModal = () => {
    setModalActive(false);
  };

  const confirmChanges = () => {
    setCategory(selectedCategory);
    setDifficulty(selectedDifficulty);

    if (modalActive) {
      setModalActive(false);
    }

    startNewGame();
  };

  const submitHandler = () => {
    if (timer > 0) {
      setModalActive(true);
      return;
    }
    confirmChanges();
  };

  const btnDisabled =
    category === selectedCategory && difficulty === selectedDifficulty;

  return {
    categories,
    selectedCategory,
    selectedDifficulty,
    btnDisabled,
    onCategoryChange,
    onDifficultyChange,
    modalActive,
    closeModal,
    submitHandler,
    confirmChanges,
  };
};

export default useSettingsForm;
