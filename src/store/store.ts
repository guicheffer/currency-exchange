import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';

import amountsSlice from './amounts/amounts.slices';
import balancesSlice from './balances/balances.slices';
import exchangeSlice from './exchange/exchange.slices';
import pollingSlices from './polling/polling.slices';
import ratesSlice from './exchange/rates/rates.slices';

import { sagaMiddleware, pollingWatcher } from "./polling/middlewares/polling-sagas";

export const store = configureStore({
  reducer: {
    amounts: amountsSlice,
    balances: balancesSlice,
    exchange: exchangeSlice,
    polling: pollingSlices,
    rates: ratesSlice,
  },
  middleware: [sagaMiddleware, ...getDefaultMiddleware()],
});

// @ts-ignore as it does not take saga types (I preferred to skip it for now)
sagaMiddleware.run(pollingWatcher);

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
