import hasCharInValuePositionBeforeLength from "../has-char-in-value-position/has-char-in-value-position";

describe("hasCharInValuePositionBeforeLength", () => {
  const CASES = [
    ['10,54', ',', 3, true],
    ['10,544', ',', 4, true],
    ['10,50', '0', 1, true],

    ['10,50', '.', 3, false],
    ['10,50', ',', 5, false],
  ];

  it.each(CASES)("%s to have %s in %i to be %s", (
    value: string,
    char: string,
    index: number,
    shouldBeTrue: Boolean,
  ) => {
    expect(hasCharInValuePositionBeforeLength(value, char, index)).toBe(shouldBeTrue);
  });
});
