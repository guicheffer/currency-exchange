import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// TODO: Remove it
import counterReducer from '../components/Counter/counterSlice';

import currenciesSlice from './slices/currencies/currencies';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currencies: currenciesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
