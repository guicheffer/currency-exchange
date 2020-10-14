import { createSlice } from '@reduxjs/toolkit';

import { CurrencySchema } from '../../app/currencies';
import DEFAULTS from '../../app/defaults';

type ExchangeState = {
  [key in CurrencySchema['iso']]: number;
}

const initialState: ExchangeState = {
  [DEFAULTS.APP.CURRENCIES.btc.iso]: 0.02,
  [DEFAULTS.APP.CURRENCIES.eur.iso]: 65,
  [DEFAULTS.APP.CURRENCIES.gbp.iso]: 15,
  [DEFAULTS.APP.CURRENCIES.usd.iso]: 500,
};

export const balancesSlice = createSlice({
  name: 'balances',
  initialState,

  // This could eventually set balances as we bring
  // them from an authenticated endpoint from an api that could feed balances along the currencies
  reducers: {},
});

export default balancesSlice.reducer;
