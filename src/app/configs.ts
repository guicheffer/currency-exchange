import { CurrencySelectionType } from '../store/amounts/amounts.slices';
import CURRENCIES, { DefaultCurrenciesInterface, CurrencySchema } from './currencies';
import TRANSLATIONS, { DefaultTranslationsInterface } from './translations';

interface ConfigsInterface {
  APP: {
    CURRENCIES: DefaultCurrenciesInterface,
    CURRENCY: {
      [key in CurrencySelectionType]: CurrencySchema;
    },
    LOCALE_STRING: string;
    TRANSLATIONS?: DefaultTranslationsInterface,
    AMOUNT: {
      SYMBOLS: {
        [key in CurrencySelectionType]: string;
      },
    },
    TIMEOUT_JUST_EXCHANGED: number,
  },
  KEYCODES: {
    [key: string]: number,
  },
}

const CONFIGS = {
  APP: {
    CURRENCIES,
    CURRENCY: {
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
    TIMEOUT_JUST_EXCHANGED: 3000,
  },
  KEYCODES: {
    DELETE: 8,
  },
} as ConfigsInterface;

export default CONFIGS;
