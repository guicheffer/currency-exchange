import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CurrencySelectionType = 'from' | 'to';

export type AmountValueState = {
  hasDecimalsStarted: boolean;
  value: null | number;
}

type AmountsState = {
  [key in CurrencySelectionType]: {
    amount: AmountValueState;
  };
}

const initialAmount = {
  hasDecimalsStarted: false,
  value: null,
};

const initialState: AmountsState = {
  from: {
    amount: initialAmount,
  },
  to: {
    amount: initialAmount,
  },
};

export const amountsSlice = createSlice({
  name: 'amounts',
  initialState,
  reducers: {
    setAmountFrom: (state, action: PayloadAction<AmountValueState>) => {
      state.from.amount = action.payload;
    },
    setAmountTo: (state, action: PayloadAction<AmountValueState>) => {
      state.to.amount = action.payload;
    },
  },
});


export const { setAmountFrom, setAmountTo } = amountsSlice.actions;

export const setAmountValue = {
  from: setAmountFrom,
  to: setAmountTo,
};

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

export default amountsSlice.reducer;
