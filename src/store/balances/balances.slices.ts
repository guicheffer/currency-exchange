import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CurrencySchema } from '../../app/currencies';
import CONFIGS from '../../app/configs';

type ExchangeState = {
  [key in CurrencySchema['iso']]: number;
}

type BalanceExchange = {
  currency: CurrencySchema['iso'];
  value: number;
}

const initialState: ExchangeState = {
  [CONFIGS.APP.CURRENCIES.eur.key]: 25000,
  [CONFIGS.APP.CURRENCIES.btc.key]: 0.05,
  [CONFIGS.APP.CURRENCIES.usd.key]: 500,
  [CONFIGS.APP.CURRENCIES.gbp.key]: 15,
};

export const balancesSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    /**
     * Ideally, exchage would call an API to update user's balance, for sure.
     *
     * I'll keep everything here since it's related to balance – for a short-term,
     * solution I could also create that in a middleware but preferred to keep it simple;
     *
     * Honestly, Redux middleware is more used for logging, crash reporting,
     * talking to an asynchronous API, routing, and more.
     */

    decrementBalance: (state, action: PayloadAction<BalanceExchange>) => {
      const { currency, value } = action.payload;
      state[currency] -= value;
    },
    incrementBalance: (state, action: PayloadAction<BalanceExchange>) => {
      const { currency, value } = action.payload;
      state[currency] += value;
    },
  },
});

const { decrementBalance, incrementBalance } = balancesSlice.actions;
export { decrementBalance, incrementBalance };

export default balancesSlice.reducer;
