export type CurrencySchema = {
  iso: string;
  symbol: string;
  minimum: number;
}

export type DefaultCurrenciesInterface = {
  [key in string]: CurrencySchema;
}

export default {
  btc: {
    iso: 'BTC',
    symbol: '₿',
    minimum: 0.01,
  },
  eur: {
    iso: 'EUR',
    symbol: '€',
    minimum: 1,
  },
  gbp: {
    iso: 'GBP',
    symbol: '£',
    minimum: 2,
  },
  usd: {
    iso: 'USD',
    symbol: '$',
    minimum: 100,
  },
} as DefaultCurrenciesInterface;
