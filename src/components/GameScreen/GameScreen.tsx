import { Board, GameStats } from "components";
import { useGameStore } from "store";
import { Button } from "components/Button";
import useGameScreen from "./useGameScreen";
import styles from "./GameScreen.module.scss";

const GameScreen = () => {
  const { isActive, onItemClick, gameFinished } = useGameScreen();
  const { difficulty, deck, startDate, startNewGame } = useGameStore();

  const btnText = gameFinished ? "play again" : "play";
  const btnVisible = !startDate || gameFinished;

  return (
    <>
      <div className={styles.gameScreenContainer}>
        <GameStats />
        <Board
          deck={deck}
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
