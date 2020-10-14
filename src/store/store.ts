import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import amountsSlice from './amounts/amounts.slices';
import balancesSlice from './balances/balances.slices';

import exchangeSlice from './exchange/exchange.slices';
import ratesSlice from './exchange/rates/rates.slices';

export const store = configureStore({
  reducer: {
    amounts: amountsSlice,
    balances: balancesSlice,

    exchange: exchangeSlice,
    rates: ratesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
