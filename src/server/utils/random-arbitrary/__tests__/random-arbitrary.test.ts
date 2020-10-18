import { getRandomArbitrary } from '../random-arbitrary';

describe('random arbitrary', () => {
  it('should bring a number between min and max for all 10 cases', () => {
    for(let casee = 1; casee <= 100; casee++) {
      const currentNumber = getRandomArbitrary(0, casee);

      expect(currentNumber).toBeLessThan(100);
      expect(currentNumber).toBeGreaterThan(0);
    }
  })
});
