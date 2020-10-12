import DEFAULTS from '../../app/defaults';

import {
  AmountValueState,
  CurrencySelectionType,
} from '../../app/slices/currencies/amounts';

const DEFAULTS_MAX_FRACTION_DIGITS = 2;
const DEFAULTS_MIN_FRACTION_DIGITS = 0;

const formatAmount = (amount: number) => {
  return amount.toLocaleString(DEFAULTS.APP.LOCALE_STRING, {
    style: 'decimal',
    maximumFractionDigits: DEFAULTS_MAX_FRACTION_DIGITS,
    minimumFractionDigits: DEFAULTS_MIN_FRACTION_DIGITS,
  });
}

export const maskAmountValue = ({ hasDecimalsStarted, value }: AmountValueState, type: CurrencySelectionType) => {
  if (value === null || Number.isNaN(value)) return '';

  const prefix = value ? `${DEFAULTS.APP.AMOUNT.SYMBOLS[type]} ` : '';
  const suffix = hasDecimalsStarted ? ',' : '';
  const formattedAmount = formatAmount(value);

  return `${prefix}${formattedAmount}${suffix}`;
}

export const removeMaskFromInputValue = (rawValue: string) => rawValue.trim().replace(/(\+|-|\.| )/g, '').replace(/,/, '.');

export default { maskAmountValue, removeMaskFromInputValue };
