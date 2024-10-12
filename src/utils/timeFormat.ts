export const secondsToTime = (totalSeconds: number) => {
  const dateObj = new Date(totalSeconds * 1000);

  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getUTCSeconds();

  const minutesFormatted = minutes.toString().padStart(2, "0");
  const secondsFormatted = seconds.toString().padStart(2, "0");

  const timeFormatted = `${minutesFormatted}:${secondsFormatted}`;

  return timeFormatted;
};
