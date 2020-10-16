import { createSelector } from 'reselect';

import { defaultAmountState } from './amounts.slices';
import { getActiveSelectionType, getExchangeIsoActiveFrom } from '../exchange/exchange.selectors';
import { getCurrentRate } from '../exchange/rates/rates.selectors';
import { RootState } from '../store';
import CONFIGS from '../../app/configs';
import roundDown from '../../commons/utils/round-down/round-down';

export const getAmountFrom = createSelector(
  (state: RootState) => state,
  (state) => getActiveSelectionType(state),
  (state) => getCurrentRate(state),
  (state, active, currentRate) => {
    const amountFrom = state.amounts.from;
    const amountTo = state.amounts.to;

    if (active === 'from' || !amountTo.value) return amountFrom.value !== null ? amountFrom : defaultAmountState;

    const value = amountTo.value / roundDown(currentRate);
    return { value };
  }
);

export const getAmountTo = createSelector(
  (state: RootState) => state,
  (state) => getActiveSelectionType(state),
  (state) => getCurrentRate(state),
  (state, active, currentRate) => {
    const amountFrom = state.amounts.from;
    const amountTo = state.amounts.to;

    if (active === 'to' || !amountFrom.value) return amountTo.value !== null ? amountTo : defaultAmountState;

    const value = amountFrom.value * roundDown(currentRate);
    return { value };
  }
);

export const getMinimumAmountToExchange = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveFrom(state),
  (state, currency) => {
    const amountFromValue = getAmountFrom(state)?.value;
    if (!amountFromValue) return true;
    return amountFromValue >= CONFIGS.APP.CURRENCIES[currency].minimum;
  },
);
