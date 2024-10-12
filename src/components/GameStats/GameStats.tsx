import { useGameStore } from "store";
import styles from "./GameStats.module.scss";
import { secondsToTime } from "utils/timeFormat";

const GameStats = () => {
  const { attempts, timer } = useGameStore();

  const timeElapsed = secondsToTime(timer);

  return (
    <div className={styles.statsContainer}>
      <div className={styles.stat}>
        Attempts: <span>{attempts}</span>
      </div>
      <div className={styles.stat}>
        Time: <span>{timeElapsed}</span>
      </div>
    </div>
  );
};

export default GameStats;
