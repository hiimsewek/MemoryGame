import { Board, GameStats } from "components";
import useGameScreen from "./useGameScreen";
const GameScreen = () => {
  const { difficulty, isActive, onItemClick, shuffledDeck } = useGameScreen();

  return (
    <div>
      <GameStats />
      <Board
        deck={shuffledDeck}
        difficulty={difficulty}
        isActive={isActive}
        onItemClick={onItemClick}
      />
    </div>
  );
};

export default GameScreen;
