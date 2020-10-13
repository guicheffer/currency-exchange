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


const { setAmountFrom, setAmountTo } = amountsSlice.actions;
export const setAmountValue = {
  from: setAmountFrom,
  to: setAmountTo,
};

export default amountsSlice.reducer;
