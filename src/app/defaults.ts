import { CurrencySelectionType } from "../store/amounts/amounts.slices";
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
  },
  KEYCODES: {
    DELETE: 8,
  },
} as DefaultsInterface;
