import { Board } from "components/Board";
import useGameScreen from "./useGameScreen";

const GameScreen = () => {
  const { difficulty, isActive, onItemClick, shuffledDeck } = useGameScreen();

  return (
    <Board
      deck={shuffledDeck}
      difficulty={difficulty}
      isActive={isActive}
      onItemClick={onItemClick}
    />
  );
};

export default GameScreen;
