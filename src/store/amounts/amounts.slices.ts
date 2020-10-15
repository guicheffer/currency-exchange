import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CurrencySelectionType = 'from' | 'to';

export type AmountValueState = {
  hasDecimalsStarted?: boolean;
  hasZeroAfterComma?: boolean;
  value: null | number;
}

type AmountPayload = {
  amount: AmountValueState;
  currentRate?: number;
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
    setAmountFrom: (state, action: PayloadAction<AmountPayload>) => {
      const { amount, currentRate } = action.payload;
      state.from.amount = amount;

      if (currentRate) {
        const { value } = amount;
        state.to.amount = { value: (value && value * currentRate) || null };
      }
    },
    setAmountTo: (state, action: PayloadAction<AmountPayload>) => {
      const { amount, currentRate } = action.payload;
      state.to.amount = amount;

      if (currentRate) {
        const { value } = amount;
        state.from.amount = { value: (value && value / currentRate) || null };
      }
    },
    reverseAmounts: (state) => {
      const fromAmount = state.from.amount;

      state.from.amount = state.to.amount;
      state.to.amount = fromAmount;
    },
  },
});


const { reverseAmounts, setAmountFrom, setAmountTo } = amountsSlice.actions;
const setAmountValue = {
  from: setAmountFrom,
  to: setAmountTo,
};

export { reverseAmounts, setAmountValue };

export default amountsSlice.reducer;
