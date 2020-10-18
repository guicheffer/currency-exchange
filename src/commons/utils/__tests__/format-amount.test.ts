import { formatAmount, maskAmountValue } from "../format-amount/format-amount";

//@ts-ignore – mock navigator's language
navigator = {
  language: 'de-DE',
};

describe("formatAmount", () => {
  describe('gets default formatted number based on `toLocaleString` function', () => {
    const CASES = [
      [10, null, '10'],
      [10.2, null, '10,2'],
      [10.39, null, '10,39'],
      [10.32513476, null, '10,33'], // round up (51)
      [10.67498373, null, '10,67'], // round down (49)
      [10.80508373, null, '10,81'], // round up (50)
      [10.39494398, 'eur', '€10.39'], // round up (39)
      [10.39514398, 'eur', '€10.4'], // round up (51)
      [10.39, 'gbp', '£10.39'],
      [10.39, 'eur', '€10.39'],
    ];

    it.each(CASES)("%s (%o) to be %s", (
      number: number,
      currency: null | string,
      expectedFormatted: string,
    ) => {
      const formattedNumber = currency ? formatAmount(number, currency) : formatAmount(number);

      expect(formattedNumber).toBe(expectedFormatted);
    });
  });
});

describe('maskAmountValue', () => {
  it('uses empty string for empty amount exchange type', () => {
    expect(maskAmountValue({ value: null }, 'to')).toBe('');
  });

  it('properly returns an masked integer for each input amount', () => {
    expect(maskAmountValue({ value: 15 }, 'from')).toBe('- 15');
    expect(maskAmountValue({ value: 15 }, 'to')).toBe('+ 15');
  });

  it('properly returns an masked float for each input amount', () => {
    expect(maskAmountValue({ value: 15.4 }, 'from')).toBe('- 15,4');
    expect(maskAmountValue({ value: 15.56 }, 'to')).toBe('+ 15,56');

    // Integration tests for `formatAmount` function
    expect(maskAmountValue({ value: 15.5449 }, 'to')).toBe('+ 15,54'); //round down (49)
    expect(maskAmountValue({ value: 15.5451 }, 'to')).toBe('+ 15,55'); //round up (55)
  });

  it('properly returns an masked float where decimals has just started', () => {
    expect(maskAmountValue({
      options: { hasDecimalsStarted: true },
      value: 15,
    }, 'from')).toBe('- 15,');

    expect(maskAmountValue({
      options: { hasDecimalsStarted: false },
      value: 15,
    }, 'from')).toBe('- 15');
  });

  it('properly returns an masked float when has zero right after comma', () => {
    expect(maskAmountValue({
      options: { hasZeroRightAfterComma: false },
      value: 15,
    }, 'from')).toBe('- 15');

    expect(maskAmountValue({
      options: { hasZeroRightAfterComma: true },
      value: 15,
    }, 'from')).toBe('- 15,0');
  });

  it('properly returns an masked float when there\s trailing zero', () => {
    expect(maskAmountValue({
      options: { hasTrailingZero: false },
      value: 15.4,
    }, 'from')).toBe('- 15,4');

    expect(maskAmountValue({
      options: { hasTrailingZero: true },
      value: 15.4,
    }, 'from')).toBe('- 15,40');
  });
});
