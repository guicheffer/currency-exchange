import { createSelector } from 'reselect';

import { getExchangeIsoActiveFrom } from '../exchange/exchange.selectors';
import { RootState } from '../store';
import DEFAULTS from '../../app/defaults';

export const getFromAmountValue = createSelector(
  (state: RootState) => state,
  (state) => state.amounts.from.amount,
);

export const getToAmountValue = createSelector(
  (state: RootState) => state,
  (state) => state.amounts.to.amount,
);

export const getMinimumAmountToExchange = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveFrom(state),
  (state, currency) => {
    if (!state.amounts.from.amount.value) return true;
    return state.amounts.from.amount.value >= DEFAULTS.APP.CURRENCIES[currency.toLowerCase()].minimum;
  },
);
