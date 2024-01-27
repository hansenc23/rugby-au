export const formatDuration = (input: number) => {
  let minutes = Math.floor(input);
  let seconds = Math.round((input - minutes) * 60);

  // Padding minutes and seconds to two digits
  let minutesFormatted = minutes.toString().padStart(2, "0");
  let secondsFormatted = seconds.toString().padStart(2, "0");

  return `${minutesFormatted}:${secondsFormatted}.0`;
};

export const parseDuration = (formattedDuration: string) => {
  let parts = formattedDuration.split(":");
  let minutes = parseInt(parts[0], 10);
  let seconds = parseInt(parts[1], 10);

  return minutes + seconds / 60;
};
