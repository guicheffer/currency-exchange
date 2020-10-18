import { beautifyCurrentRate, getLastTwoDigits } from '../display-current-rate/display-current-rate';

describe('beautifyCurrentRate', () => {
  it('gets default 00 when beautifying numbers with no decimals', () => {
    expect(beautifyCurrentRate(10)).toBe('10,00');
  });

  it('beautify given number', () => {
    expect(beautifyCurrentRate(456.67)).toBe('456,67');
    expect(beautifyCurrentRate(456.52)).toBe('456,52');
    expect(beautifyCurrentRate(456.35)).toBe('456,35');
  });
});

describe('getLastTwoDigits', () => {
  it('gets 00 when no number as four decimals', () => {
    expect(getLastTwoDigits(1)).toBe('00');
  });

  it('properly executes the function', () => {
    expect(getLastTwoDigits(456.1267)).toBe('67');
    expect(getLastTwoDigits(456.1252)).toBe('52');
    expect(getLastTwoDigits(456.1235)).toBe('35');
  });
});
