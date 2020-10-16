import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AmountOptions = {
  hasDecimalsStarted?: boolean;
  hasTrailingZero?: boolean;
  hasZeroRightAfterComma?: boolean;
}

export type CurrencySelectionType = 'from' | 'to';

export type AmountSet = {
  options?: AmountOptions;
  value: null | number;
}

type AmountState = {
  [key in CurrencySelectionType]: AmountSet;
}

export const defaultAmountState = { value: null };
const initialState: AmountState = {
  from: defaultAmountState,
  to: defaultAmountState,
};

export const amountsSlice = createSlice({
  name: 'amounts',
  initialState,
  reducers: {
    clearAmountValues: (state) => {
      state.from = defaultAmountState;
      state.to = defaultAmountState;
    },
    setAmountFrom: (state, action: PayloadAction<AmountSet>) => {
      state.from = { ...action.payload };
    },
    setAmountTo: (state, action: PayloadAction<AmountSet>) => {
      state.to = { ...action.payload };
    },
  },
});


const { clearAmountValues, setAmountFrom, setAmountTo } = amountsSlice.actions;
const setAmountValue = {
  from: setAmountFrom,
  to: setAmountTo,
};
export { clearAmountValues, setAmountFrom, setAmountTo, setAmountValue };

export default amountsSlice.reducer;
