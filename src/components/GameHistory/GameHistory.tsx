import { getDateWithTime, secondsToTime } from "utils/timeFormat";
import { useGameStore } from "store";
import styles from "./GameHistory.module.scss";

const GameHistory = () => {
  const { gameHistory } = useGameStore();

  const showHistory = gameHistory.length > 0;

  return (
    <div>
      <div className={styles.title}>Game History</div>
      {showHistory ? (
        <table className={styles.historyTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Duration</th>
              <th>Attempts</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {gameHistory.map((el, i) => (
              <tr key={i}>
                <td>{getDateWithTime(el.date)}</td>
                <td>{secondsToTime(el.duration)}</td>
                <td>{el.attempts}</td>
                <td>{el.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.backupMsg}>No games found</div>
      )}
    </div>
  );
};

export default GameHistory;
