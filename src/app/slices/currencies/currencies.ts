import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk, RootState } from '../../../app/store';

export type CurrencySelectionType = 'from' | 'to';

export type AmountValueState = {
  hasDecimalsStarted: boolean;
  value: null | number;
}

type CurrencySchema = {
  [key in CurrencySelectionType]: {
    amount: AmountValueState;
  };
}

interface CurrenciesState {
  active: CurrencySelectionType;
  currency: CurrencySchema;
}

const initialAmount = {
  hasDecimalsStarted: false,
  value: null,
};

const initialState: CurrenciesState = {
  active: 'from',
  currency: {
    from: {
      amount: initialAmount,
    },
    to: {
      amount: initialAmount,
    },
  },
};

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setAmountFrom: (state, action: PayloadAction<AmountValueState>) => {
      state.currency.from.amount = action.payload;
    },
    setAmountTo: (state, action: PayloadAction<AmountValueState>) => {
      state.currency.to.amount = action.payload;
    },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});


export const { setAmountFrom, setAmountTo } = currenciesSlice.actions;

export const setAmountValue = {
  from: setAmountFrom,
  to: setAmountTo,
};

// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.currencies.value)`
// export const selectCount = (state: RootState) => state.currencies.value;

export default currenciesSlice.reducer;
