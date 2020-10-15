import { createSelector } from 'reselect';

import { getExchangeIsoActiveFrom } from '../exchange/exchange.selectors';
import { RootState } from '../store';
import CONFIGS from '../../app/configs';

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
    return state.amounts.from.amount.value >= CONFIGS.APP.CURRENCIES[currency.toLowerCase()].minimum;
  },
);
