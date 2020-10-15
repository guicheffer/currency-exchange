import { createSlice, /*PayloadAction*/ } from '@reduxjs/toolkit';

import { CurrencySchema } from '../../../app/currencies';
import CONFIGS from '../../../app/configs';

type ExchangeState = {
  [key in CurrencySchema['iso']]: number;
}


// TODO: Add more error handling around here
// (sorry, there was not a long time to complete everything)

const initialState: ExchangeState = {
  // TODO: Organize base currency (Base = GBP)
  [CONFIGS.APP.CURRENCIES.btc.iso]: 1,
  [CONFIGS.APP.CURRENCIES.eur.iso]: 0.9,
  [CONFIGS.APP.CURRENCIES.usd.iso]: 1,
  [CONFIGS.APP.CURRENCIES.gbp.iso]: 1.1,
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
