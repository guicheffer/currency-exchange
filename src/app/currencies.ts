export type CurrencySchema = {
  key: string;
  iso: string;
  symbol: string;
  minimum: number;
}

export type DefaultCurrenciesType = {
  [key in string]: CurrencySchema;
}

export default {
  btc: {
    key: 'btc',
    iso: 'BTC',
    symbol: '₿',
    minimum: 0.01,
  },
  eur: {
    key: 'eur',
    iso: 'EUR',
    symbol: '€',
    minimum: 1,
  },
  gbp: {
    key: 'gbp',
    iso: 'GBP',
    symbol: '£',
    minimum: 2,
  },
  usd: {
    key: 'usd',
    iso: 'USD',
    symbol: '$',
    minimum: 100,
  },
} as DefaultCurrenciesType;
