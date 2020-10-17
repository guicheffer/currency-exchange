import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CurrencySchema } from '../../../app/currencies';
import CONFIGS from '../../../app/configs';

type ExchangeState = {
  forex: {
    [key in CurrencySchema['key']]: number;
  };
}

const initialState: ExchangeState = {
  forex: {
    [CONFIGS.APP.CURRENCIES.btc.key]: 1,
    [CONFIGS.APP.CURRENCIES.eur.key]: 1,
    [CONFIGS.APP.CURRENCIES.usd.key]: 1,
    [CONFIGS.APP.CURRENCIES.gbp.key]: 1,
  },
};

export const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    updateForexRates: (state, { payload: rawForexRates }: PayloadAction<ExchangeState['forex']>) => {
      const newForexRates = Object.keys(rawForexRates).reduce((newRates: ExchangeState['forex'], rawCurrentIso: string) => {
        const currentIso = rawCurrentIso.toLowerCase() as CurrencySchema['key']
        newRates[currentIso] = rawForexRates[rawCurrentIso];
        return newRates;
      }, {}) as ExchangeState['forex'];

      state.forex = newForexRates;
    },
  },
});

export const { updateForexRates } = ratesSlice.actions;

export default ratesSlice.reducer;
