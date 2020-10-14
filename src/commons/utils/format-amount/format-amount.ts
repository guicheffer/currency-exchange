import { CurrencySchema } from '../../../app/currencies';
import DEFAULTS from '../../../app/defaults';

import {
  AmountValueState,
  CurrencySelectionType,
} from '../../../store/amounts/amounts.slices';

const DEFAULTS_MAX_FRACTION_DIGITS = 2;
const DEFAULTS_MIN_FRACTION_DIGITS = 0;
const DEFAULTS_MAX_FRACTION_DIGITS_ON_BTC = 8;

export const formatAmount = (amount: number, currency?: CurrencySchema['iso']) => {
  // This will rely on users' native language when currency is passed (for balance purposes)
  // Likewise, for users' input on the amount value, format will remain the same
  const locale = currency ? navigator.language : DEFAULTS.APP.LOCALE_STRING;
  const payload = currency ? { currency, style: 'currency' } : { style: 'decimal' };

  const formattedAmount = amount.toLocaleString(locale, {
    ...payload,
    minimumFractionDigits: DEFAULTS_MIN_FRACTION_DIGITS,

    // If currency is a bitcoin, we make sure we display all the decimals (since, you know...)
    maximumFractionDigits: !currency || currency !== DEFAULTS.APP.CURRENCIES.btc.iso ? DEFAULTS_MAX_FRACTION_DIGITS : DEFAULTS_MAX_FRACTION_DIGITS_ON_BTC,
  });

  // If there's given currency then we replace with the proper currency's symbol
  // since `toLocaleString` is not capable of converting all of them (for instance, 'BTC' which is essentially '₿');
  //
  // Otherwise, a formatted amount (as browser does) returns the expected localized amount string;
  if (!currency) return formattedAmount;
  return formattedAmount.replace(currency, DEFAULTS.APP.CURRENCIES[currency.toLowerCase()].symbol);
}

export const maskAmountValue = ({
  hasDecimalsStarted,
  hasZeroAfterComma,
  value,
}: AmountValueState, type: CurrencySelectionType) => {
  if (value === null || Number.isNaN(value)) return '';

  const symbolPrefix = value ? `${DEFAULTS.APP.AMOUNT.SYMBOLS[type]} ` : '';
  const formattedAmount = formatAmount(value);

  let requiredSuffix = '';
  requiredSuffix = hasDecimalsStarted ? ',' : '';
  requiredSuffix += hasZeroAfterComma ? ',0' : '';

  return `${symbolPrefix}${formattedAmount}${requiredSuffix}`;
}

export const removeMaskFromInputValue = (rawValue: string) => rawValue.trim().replace(/(\+|-|\.| )/g, '').replace(/,/, '.');

