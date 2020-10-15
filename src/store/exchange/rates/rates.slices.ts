import { createSlice, /*PayloadAction*/ } from '@reduxjs/toolkit';

import { CurrencySchema } from '../../../app/currencies';
import CONFIGS from '../../../app/configs';

type ExchangeState = {
  [key in CurrencySchema['iso']]: number;
}

// TODO: Add more error handling around here
// (sorry, there was not a long time to add better error handling in here)

const initialState: ExchangeState = {
  // TODO: Organize base currency (Base = GBP)

  [CONFIGS.APP.CURRENCIES.btc.key]: 0.1111,
  [CONFIGS.APP.CURRENCIES.eur.key]: 0.9,
  [CONFIGS.APP.CURRENCIES.usd.key]: 1,
  [CONFIGS.APP.CURRENCIES.gbp.key]: 1.1750,
};

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    // TODO: Set rates based on redux-saga (coming from generators)
    //
    // setRates: (state, action: PayloadAction<Rates[]>) => {
    //   state.rates = action.payload;
    // },
  },
});

// TODO: Revisit here
// export const { setRates } = ratesSlice.actions;

export default ratesSlice.reducer;
