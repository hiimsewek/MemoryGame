export const secondsToTime = (totalSeconds: number) => {
  const dateObj = new Date(totalSeconds * 1000);

  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getUTCSeconds();

  const minutesFormatted = minutes.toString().padStart(2, "0");
  const secondsFormatted = seconds.toString().padStart(2, "0");

  const timeFormatted = `${minutesFormatted}:${secondsFormatted}`;

  return timeFormatted;
};

export const getDateWithTime = (fullDate: Date) => {
  const d = new Date(fullDate);
  const date = d.toLocaleDateString();
  const time = d.toLocaleTimeString().substring(0, 5);

  return `${date} ${time}`;
};
