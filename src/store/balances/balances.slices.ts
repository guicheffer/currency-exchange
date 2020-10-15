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
