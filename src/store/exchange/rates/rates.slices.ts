import { createSlice, /*PayloadAction*/ } from '@reduxjs/toolkit';

import { CurrencySchema } from '../../../app/currencies';
import DEFAULTS from '../../../app/defaults';

type ExchangeState = {
  [key in CurrencySchema['iso']]: number;
}


// TODO: Add more error handling around here
// (sorry, there was not a long time to complete everything)

const initialState: ExchangeState = {
  // TODO: Organize base currency (Base = GBP)
  [DEFAULTS.APP.CURRENCIES.btc.iso]: 1,
  [DEFAULTS.APP.CURRENCIES.eur.iso]: 1,
  [DEFAULTS.APP.CURRENCIES.usd.iso]: 1,
  [DEFAULTS.APP.CURRENCIES.gbp.iso]: 1,
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
