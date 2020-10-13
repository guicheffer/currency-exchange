export type CurrencySchema = {
  iso: string;
  symbol: string;
}

export type DefaultCurrenciesInterface = {
  [key in string]: CurrencySchema;
}

export default {
  btc: {
    iso: 'BTC',
    symbol: '₿',
  },
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
} as DefaultCurrenciesInterface;
