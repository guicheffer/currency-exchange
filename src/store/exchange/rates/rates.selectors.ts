import { createSelector } from 'reselect';

import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../exchange.selectors';
import { RootState } from '../../store';

export const getCurrentBaseRate = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveFrom(state),
  (state, currency) => state.rates[currency],
);

export const getCurrentRate = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveTo(state),
  (state, currency) => state.rates[currency],
);
