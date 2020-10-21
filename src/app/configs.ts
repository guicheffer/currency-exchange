import { CurrencySelectionType } from '../store/amounts/amounts.slices';
import API_URLS, { DefaultApiUrlsType } from './api-urls';
import CURRENCIES, { DefaultCurrenciesType, CurrencySchema } from './currencies';
import TRANSLATIONS, { DefaultTranslationsType } from './translations';

export type Env = 'development' | 'test' | 'production';

interface ConfigsInterface {
  APP: {
    CURRENCIES: DefaultCurrenciesType;
    API_URLS: DefaultApiUrlsType;
    TRANSLATIONS?: DefaultTranslationsType;

    LOCALE_STRING: string;
    DEFAULT_CURRENCY: {
      [key in CurrencySelectionType]: CurrencySchema;
    };

    AMOUNT: {
      SYMBOLS: {
        [key in CurrencySelectionType]: string;
      };
    };
    MAX_FRACTION_DIGITS: number;
    MAX_FRACTION_DIGITS_BTC: number;
    MIN_FRACTION_DIGITS: number;
    POLLING_DURATION: number;
    TWO_LAST_DIGITS_FRACTION: number;
    TIMEOUT_JUST_EXCHANGED: number;
  },
  KEYCODES: {
    [key: string]: number;
  },
}

const CONFIGS = {
  APP: {
    API_URLS,
    CURRENCIES,
    TRANSLATIONS,

    LOCALE_STRING: 'de-DE',
    DEFAULT_CURRENCY: {
      from: CURRENCIES.gbp,
      to: CURRENCIES.eur,
    },

    AMOUNT: {
      SYMBOLS: {
        from: '-',
        to: '+',
      },
    },

    MAX_FRACTION_DIGITS: 2,
    MAX_FRACTION_DIGITS_BTC: 8,
    MIN_FRACTION_DIGITS: 0,
    POLLING_DURATION: 10000, // 10 seconds
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
