import CONFIGS from '../../../app/configs';
import roundDown from '../round-down/round-down';

const beautifyCurrentRate = (rate: number) => {
  const rateRoundedDown = roundDown(rate);
  const rateWithDecimals = rateRoundedDown.toFixed(CONFIGS.APP.MAX_FRACTION_DIGITS);
  const pricefyRate = rateWithDecimals.replace('.', ',');

  return pricefyRate;
}

const getLastTwoDigits = (number: number) => {
  const fullNumber = number.toFixed(CONFIGS.APP.TWO_LAST_DIGITS_FRACTION);
  const fullNumberLength = fullNumber.toString().length;
  const lastTwoDigits = fullNumber.substring(fullNumberLength - 2);

  return lastTwoDigits;
}

export { beautifyCurrentRate, getLastTwoDigits };
