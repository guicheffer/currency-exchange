import DEFAULTS from '../../app/defaults';

const DEFAULTS_MAX_FRACTION_DIGITS = 2;
const DEFAULTS_MIN_FRACTION_DIGITS = 0;

export const formatAmount = (amount: number) => {
  const rawFormattedAmount = amount.toLocaleString('en', {
    currency: DEFAULTS.APP.CURRENCY,
    maximumFractionDigits: DEFAULTS_MAX_FRACTION_DIGITS,
    minimumFractionDigits: DEFAULTS_MIN_FRACTION_DIGITS,
    style: 'currency',
  });

  return rawFormattedAmount.replace(/,/g, '.').replace(/\.(\d{0,2})$/, `,$1`).replace(/€/, '')
}

export default formatAmount;
