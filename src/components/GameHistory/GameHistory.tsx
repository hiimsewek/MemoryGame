import { getItem } from "utils/storage";
import { getDateWithTime, secondsToTime } from "utils/timeFormat";
import styles from "./GameHistory.module.scss";
import { HistoryItem } from "types";

const GameHistory = () => {
  const historyItem = getItem("history") as HistoryItem[] | null;

  return (
    <div>
      <div className={styles.title}>Game History</div>
      {historyItem ? (
        <table className={styles.historyTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Attempts</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {historyItem.map((el, i) => (
              <tr key={i}>
                <td>{getDateWithTime(el.date)}</td>
                <td>{secondsToTime(el.time)}</td>
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
