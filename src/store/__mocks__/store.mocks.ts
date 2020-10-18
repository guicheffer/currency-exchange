export default {
  amounts: {
    from: {
      value: null,
    },
    to: {
      value: null,
    }
  },
  balances: {
    eur: 25000,
    btc: 0.05,
    usd: 500,
    gbp: 15,
  },
  exchange: {
    active: 'from',
    currency: {
      from: 'GBP',
      to: 'EUR',
    }
  },
  polling: {
    progress: 0,
  },
  rates: {
    forex: {
      btc: 1,
      eur: 3,
      usd: 1,
      gbp: 1,
    },
  },
};
