export const getNewId = () => Math.random().toString(16).slice(2);

export const getTimeFromMs = (ms) => {
  const date = new Date(ms)
  return `${date.getHours()}:${date.getMinutes()}`
}