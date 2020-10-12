export type CurrencySchema = {
  iso: string;
  symbol: string;
}

export interface DefaultCurrenciesInterface {
  [key: string]: CurrencySchema;
}

export default {
  eur: {
    iso: 'EUR',
    symbol: '€',
  },
  gbp: {
    iso: 'GBP',
    symbol: '£',
  },
  usd: {
    iso: 'USD',
    symbol: '$',
  },
  btc: {
    iso: 'BTC',
    symbol: '₿',
  },
} as DefaultCurrenciesInterface;
