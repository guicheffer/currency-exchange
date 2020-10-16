const hasCharInValuePositionBeforeLength = (
  value: string,
  char: string,
  index: number,
) => {
  return char === value[value.length - index];
};

export default hasCharInValuePositionBeforeLength;
