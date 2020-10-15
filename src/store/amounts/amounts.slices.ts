import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import roundDown from '../../commons/utils/round-down/round-down';

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
      console.log('heeeey');
      const { amount, currentRate } = action.payload;
      state.from.amount = amount;

      // TODO: Change that to selectors (and not state change)
      if (currentRate) {
        const { value } = amount;
        const newToValue = value && roundDown(value * currentRate);
        state.to.amount = { value: newToValue ?? null };
      }
    },
    setAmountTo: (state, action: PayloadAction<AmountPayload>) => {
      const { amount, currentRate } = action.payload;
      state.to.amount = amount;

      // TODO: Change that to selectors (and not state change)
      if (currentRate) {
        const { value } = amount;
        const newToValue = value && roundDown(value / currentRate);
        state.from.amount = { value: newToValue ?? null };
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
