import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CurrencySelectionType = 'from' | 'to';

export type AmountValueState = {
  hasDecimalsStarted?: boolean;
  hasZeroAfterComma?: boolean;
  value: null | number;
}

type AmountsState = {
  [key in CurrencySelectionType]: {
    amount: AmountValueState;
  };
}

const initialAmount = { value: null };

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
    clearAmounts: (state) => {
      state.from.amount = { value: null };
      state.to.amount = { value: null };
    },
    setAmountFrom: (state, action: PayloadAction<AmountValueState>) => {
      const amount = action.payload;
      state.from.amount = amount;
    },
    setAmountTo: (state, action: PayloadAction<AmountValueState>) => {
      const amount = action.payload;
      state.to.amount = amount;
    },
  },
});


const { clearAmounts, setAmountFrom, setAmountTo } = amountsSlice.actions;
const setAmountValue = {
  from: setAmountFrom,
  to: setAmountTo,
};
export { clearAmounts, setAmountValue };

export default amountsSlice.reducer;
