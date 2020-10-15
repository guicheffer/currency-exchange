import { CurrencySelectionType } from '../store/amounts/amounts.slices';
import CURRENCIES, { DefaultCurrenciesInterface, CurrencySchema } from './currencies';
import TRANSLATIONS, { DefaultTranslationsInterface } from './translations';

interface ConfigsInterface {
  APP: {
    CURRENCIES: DefaultCurrenciesInterface,
    DEFAULT_CURRENCY: {
      [key in CurrencySelectionType]: CurrencySchema;
    },
    LOCALE_STRING: string;
    TRANSLATIONS?: DefaultTranslationsInterface,
    AMOUNT: {
      SYMBOLS: {
        [key in CurrencySelectionType]: string;
      },
    },
    MAX_FRACTION_DIGITS: number,
    MAX_FRACTION_DIGITS_BTC: number,
    MIN_FRACTION_DIGITS: number,
    TWO_LAST_DIGITS_FRACTION: number,
    TIMEOUT_JUST_EXCHANGED: number,
  },
  KEYCODES: {
    [key: string]: number,
  },
}

const CONFIGS = {
  APP: {
    CURRENCIES,
    DEFAULT_CURRENCY: {
      from: CURRENCIES.gbp,
      to: CURRENCIES.eur,
    },
    LOCALE_STRING: 'de-DE',
    TRANSLATIONS,
    AMOUNT: {
      SYMBOLS: {
        from: '-',
        to: '+',
      },
    },

    MAX_FRACTION_DIGITS: 2,
    MAX_FRACTION_DIGITS_BTC: 8,
    MIN_FRACTION_DIGITS: 0,
    TWO_LAST_DIGITS_FRACTION: 4,

    // Timeout for helping exchange action to hide its last triggered action state
    // Sorry for that, might be overengineering... 👀
    TIMEOUT_JUST_EXCHANGED: 3000,
  },
  KEYCODES: {
    DELETE: 8,
  },
} as ConfigsInterface;

export default CONFIGS;
