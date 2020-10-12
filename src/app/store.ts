import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import amountsSlice from './slices/amounts';

export const store = configureStore({
  reducer: {
    amounts: amountsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
