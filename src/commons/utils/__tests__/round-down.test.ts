import roundDown from "../round-down/round-down";

describe("roundDown", () => {
  const CASES = [
    [10, 10],
    [10.54, 10.54],

    [10.50, 10.5],
    [10.510000, 10.51],
    [10.5199999, 10.51],
    [0.519999911, 0.51],
  ];

  it.each(CASES)("%s to have %s in %i to be %s", (rawValue: number, expectednumber: number) => {
    expect(roundDown(rawValue)).toBe(expectednumber);
  });
});
