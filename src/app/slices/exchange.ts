import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CurrencySelectionType } from './amounts';
import { CurrencySchema } from '../defaults/currencies';
import DEFAULTS from '../defaults/defaults';

type ExchangeState = {
  active: {
    [key in CurrencySelectionType]: CurrencySchema['iso'];
  }
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

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.amounts.value)`
// export const selectCount = (state: RootState) => state.amounts.value;

export default exchangeSlice.reducer;
