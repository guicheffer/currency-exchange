import { CurrencySelectionType } from "../slices/amounts";
import CURRENCIES, { DefaultCurrenciesInterface, CurrencySchema } from './currencies';
import TRANSLATIONS, { DefaultTranslationsInterface } from './translations';

interface DefaultsInterface {
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
  },
  KEYCODES: {
    [key: string]: number,
  },
}

export default {
  APP: {
    CURRENCIES,
    CURRENCY: {
      from: CURRENCIES.eur,
      to: CURRENCIES.btc,
    },
    LOCALE_STRING: 'de-DE',
    TRANSLATIONS,
    AMOUNT: {
      SYMBOLS: {
        from: '-',
        to: '+',
      },
    },
  },
  KEYCODES: {
    DELETE: 8,
  },
} as DefaultsInterface;
