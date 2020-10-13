import { CurrencySchema } from '../../app/defaults/currencies';
import DEFAULTS from '../../app/defaults/defaults';

import {
  AmountValueState,
  CurrencySelectionType,
} from '../../app/slices/amounts';

const DEFAULTS_MAX_FRACTION_DIGITS = 2;
const DEFAULTS_MIN_FRACTION_DIGITS = 0;

export const formatAmount = (amount: number, currency?: CurrencySchema['iso']) => {
  // This will rely on users' native language when currency is passed (for balance purposes)
  // Likewise, for users' input on the amount value, format will remain the same
  const languageSensitive = currency ? navigator.language : DEFAULTS.APP.LOCALE_STRING;

  const payload = currency ? {
    currency,
    style: 'currency',
  } : { style: 'decimal' };

  return amount.toLocaleString(languageSensitive, {
    ...payload,
    maximumFractionDigits: DEFAULTS_MAX_FRACTION_DIGITS,
    minimumFractionDigits: DEFAULTS_MIN_FRACTION_DIGITS,
  });
}

export const maskAmountValue = ({ hasDecimalsStarted, value }: AmountValueState, type: CurrencySelectionType) => {
  if (value === null || Number.isNaN(value)) return '';

  const symbolPrefix = value ? `${DEFAULTS.APP.AMOUNT.SYMBOLS[type]} ` : '';
  const commaAsSuffix = hasDecimalsStarted ? ',' : '';
  const formattedAmount = formatAmount(value);

  return `${symbolPrefix}${formattedAmount}${commaAsSuffix}`;
}

export const removeMaskFromInputValue = (rawValue: string) => rawValue.trim().replace(/(\+|-|\.| )/g, '').replace(/,/, '.');

