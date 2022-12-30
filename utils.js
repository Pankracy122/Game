export const countTimePassed = (today) => {
  const timePassed = Date.now() - today;
  const minutes = Math.floor((timePassed / 1000 / 60) % 60);
  return {
    minutes,
  };
};
