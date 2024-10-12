import { Board, GameStats } from "components";
import useGameScreen from "./useGameScreen";
import styles from "./GameScreen.module.scss";
import { Button } from "components/Button";
import { useGameStore } from "store";

const GameScreen = () => {
  const { difficulty, isActive, onItemClick, shuffledDeck, gameFinished } =
    useGameScreen();
  const { startDate, startNewGame } = useGameStore();

  const btnText = gameFinished ? "play again" : "play";
  const btnVisible = !startDate || gameFinished;

  return (
    <>
      <div className={styles.gameScreenContainer}>
        <GameStats />
        <Board
          deck={shuffledDeck}
          difficulty={difficulty}
          boardDisabled={!startDate}
          isItemActive={isActive}
          onItemClick={onItemClick}
        />

        {btnVisible && (
          <Button onClick={startNewGame} styleProp={styles.btnSpacing}>
            {btnText}
          </Button>
        )}
      </div>
    </>
  );
};

export default GameScreen;
