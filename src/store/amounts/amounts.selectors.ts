import { createSelector } from 'reselect';

import { AmountValueState } from './amounts.slices';
import { getActiveExchange, getExchangeIsoActiveFrom } from '../exchange/exchange.selectors';
import { getCurrentRate } from '../exchange/rates/rates.selectors';
import { RootState } from '../store';
import CONFIGS from '../../app/configs';
import roundDown from '../../commons/utils/round-down/round-down';

const DEFAULT_EMPTY_AMOUNT_VALUE: AmountValueState = { value: null };

export const getFromAmountValue = createSelector(
  (state: RootState) => state,
  (state) => getActiveExchange(state),
  (state) => getCurrentRate(state),
  (state, active, currentRate) => {
    const fromAmountValue = state.amounts.from.amount.value;
    const toAmountValue = state.amounts.to.amount.value;
    if (active === 'from' || !toAmountValue) return fromAmountValue ? state.amounts.from.amount : DEFAULT_EMPTY_AMOUNT_VALUE;

    // TODO: Change "amountValue" from strings
    return { value: roundDown(toAmountValue / currentRate) };
  }
);

export const getToAmountValue = createSelector(
  (state: RootState) => state,
  (state) => getActiveExchange(state),
  (state) => getCurrentRate(state),
  (state, active, currentRate) => {
    const fromAmountValue = state.amounts.from.amount.value;
    const toAmountValue = state.amounts.to.amount.value;
    if (active === 'to' || !fromAmountValue) return toAmountValue ? state.amounts.to.amount : DEFAULT_EMPTY_AMOUNT_VALUE;

    return { value: roundDown(fromAmountValue * currentRate) };
  }
);

export const getMinimumAmountToExchange = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveFrom(state),
  (state, currency) => {
    if (!state.amounts.from.amount.value) return true;
    return state.amounts.from.amount.value >= CONFIGS.APP.CURRENCIES[currency].minimum;
  },
);
