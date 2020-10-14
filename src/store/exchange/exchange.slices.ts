import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CurrencySelectionType } from '../amounts/amounts.slices';
import { CurrencySchema } from '../../app/currencies';
import DEFAULTS from '../../app/defaults';

type ExchangeState = {
  active: {
    [key in CurrencySelectionType]: CurrencySchema['iso'];
  },
}

const initialState: ExchangeState = {
  active: {
    from: DEFAULTS.APP.CURRENCY.from.iso,
    to: DEFAULTS.APP.CURRENCY.to.iso,
  },
};

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    setActiveFrom: (state, action: PayloadAction<CurrencySchema['iso']>) => {
      state.active.from = action.payload;
    },
    setActiveTo: (state, action: PayloadAction<CurrencySchema['iso']>) => {
      state.active.to = action.payload;
    },
    reverseCurrencies: (state) => {
      const currencyTo = state.active.to;

      state.active.to = state.active.from;
      state.active.from = currencyTo;
    },
  },
});


export const {
  reverseCurrencies,
  setActiveFrom,
  setActiveTo,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
