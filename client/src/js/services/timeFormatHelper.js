export const getTimeFromMs = (ms) => {
  const date = new Date(ms);
  return `${date.getHours()}:${date.getMinutes()}`;
};
