import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CurrencySelectionType } from '../amounts/amounts.slices';
import { CurrencySchema } from '../../app/currencies';
import CONFIGS from '../../app/configs';

type ExchangeState = {
  active: CurrencySelectionType,
  currency: {
    [key in CurrencySelectionType]: CurrencySchema['iso'];
  },
}

const initialState: ExchangeState = {
  active: 'from',
  currency: {
    from: CONFIGS.APP.DEFAULT_CURRENCY.from.iso,
    to: CONFIGS.APP.DEFAULT_CURRENCY.to.iso,
  },
};

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setCurrencyActiveFrom: (state, action: PayloadAction<CurrencySchema['iso']>) => {
      state.currency.from = action.payload;
    },
    setCurrencyActiveTo: (state, action: PayloadAction<CurrencySchema['iso']>) => {
      state.currency.to = action.payload;
    },
    reverseCurrencies: (state) => {
      const currencyTo = state.currency.to;

      state.currency.to = state.currency.from;
      state.currency.from = currencyTo;
    },
    setActiveExchange: (state, action: PayloadAction<CurrencySelectionType>) => {
      state.active = action.payload;
    },
  },
});


export const {
  reverseCurrencies,
  setCurrencyActiveFrom,
  setCurrencyActiveTo,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
