import { CurrencySchema } from '../../../app/currencies';
import CONFIGS from '../../../app/configs';

import { AmountSet } from '../../../store/amounts/amounts.slices'
import { CurrencySelectionType } from '../../../store/amounts/amounts.slices';

const CONFIGS_MAX_FRACTION_DIGITS = CONFIGS.APP.MAX_FRACTION_DIGITS;
const CONFIGS_MIN_FRACTION_DIGITS = CONFIGS.APP.MIN_FRACTION_DIGITS;
const CONFIGS_MAX_FRACTION_DIGITS_BTC = CONFIGS.APP.MAX_FRACTION_DIGITS_BTC;

export const formatAmount = (amountValue: number, currency?: CurrencySchema['iso'] ) => {
  // This will rely on users' native language when currency is passed (for balance purposes)
  // Likewise, for users' input on the amount value, format will remain the same
  const locale = currency ? navigator.language : CONFIGS.APP.LOCALE_STRING;
  const payload = currency ? { currency, style: 'currency' } : { style: 'decimal' };

  const formattedAmount = amountValue.toLocaleString(locale, {
    ...payload,
    minimumFractionDigits: CONFIGS_MIN_FRACTION_DIGITS,

    // If currency is a bitcoin, we make sure we display all the decimals (since, you know...)
    maximumFractionDigits: !currency || currency !== CONFIGS.APP.CURRENCIES.btc.iso ? CONFIGS_MAX_FRACTION_DIGITS : CONFIGS_MAX_FRACTION_DIGITS_BTC,
  });

  // If there's given currency then we replace with the proper currency's symbol
  // since `toLocaleString` is not capable of converting all of them (for instance, 'BTC' which is essentially '₿');
  //
  // Otherwise, a formatted amount (as browser does) returns the expected localized amount string;
  if (!currency) return formattedAmount;
  return formattedAmount.replace(currency, CONFIGS.APP.CURRENCIES[currency].symbol);
}

export const maskAmountValue = ({ value, options = {} }: AmountSet, type: CurrencySelectionType) => {
  if (value === null || Number.isNaN(value)) return '';

  const symbolPrefix = value !== null ? `${CONFIGS.APP.AMOUNT.SYMBOLS[type]} ` : '';
  const formattedAmount = formatAmount(value);

  const { hasDecimalsStarted, hasZeroRightAfterComma } = options;

  let requiredSuffix = '';
  requiredSuffix = hasDecimalsStarted ? ',' : '';
  requiredSuffix += hasZeroRightAfterComma ? ',0' : '';

  return `${symbolPrefix}${formattedAmount}${requiredSuffix}`;
}

export const removeMaskFromInputValue = (rawValue: string) => rawValue.trim().replace(/(\+|-|\.| )/g, '').replace(/,/, '.');

