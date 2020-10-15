import { createSelector } from 'reselect';

import { RootState } from '../store';

export const getExchangeIsoActiveFrom = createSelector(
  (state: RootState) => state,
  (state) => state.exchange.active.from.toLowerCase(),
);

export const getExchangeIsoActiveTo = createSelector(
  (state: RootState) => state,
  (state) => state.exchange.active.to.toLowerCase(),
);
