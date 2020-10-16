import { createSelector } from 'reselect';

import { defaultAmountState } from './amounts.slices';
import { getActiveExchange, getExchangeIsoActiveFrom } from '../exchange/exchange.selectors';
import { getCurrentRate } from '../exchange/rates/rates.selectors';
import { RootState } from '../store';
import CONFIGS from '../../app/configs';
import roundDown from '../../commons/utils/round-down/round-down';

export const getAmountFromRawValue = createSelector(
  (state: RootState) => state,
  (state) => state.amounts.from.value,
);

export const getAmountToRawValue = createSelector(
  (state: RootState) => state,
  (state) => state.amounts.to.value,
);

export const getAmountFrom = createSelector(
  (state: RootState) => state,
  (state) => getActiveExchange(state),
  (state) => getCurrentRate(state),
  (state, active, currentRate) => {
    const amountFrom = state.amounts.from;
    const amountTo = state.amounts.to;

    if (active === 'from' || !amountTo.value) return amountFrom.value ? amountFrom : defaultAmountState;

    const value = roundDown(amountTo.value / currentRate);
    return { value };
  }
);

export const getAmountTo = createSelector(
  (state: RootState) => state,
  (state) => getActiveExchange(state),
  (state) => getCurrentRate(state),
  (state, active, currentRate) => {
    const amountFrom = state.amounts.from;
    const amountTo = state.amounts.to;

    if (active === 'to' || !amountFrom.value) return amountTo.value ? amountTo : defaultAmountState;

    return { value: roundDown(amountFrom.value * currentRate) };
  }
);

export const getMinimumAmountToExchange = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveFrom(state),
  (state, currency) => {
    if (!state.amounts.from.value) return true;
    return state.amounts.from.value >= CONFIGS.APP.CURRENCIES[currency].minimum;
  },
);
