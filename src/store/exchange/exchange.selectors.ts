import { createSelector } from 'reselect';

import { RootState } from '../store';

export const getActiveSelectionType = createSelector(
  (state: RootState) => state,
  (state) => state.exchange.active,
);

export const getExchangeIsoActiveFrom = createSelector(
  (state: RootState) => state,
  (state) => state.exchange.currency.from.toLowerCase(),
);

export const getExchangeIsoActiveTo = createSelector(
  (state: RootState) => state,
  (state) => state.exchange.currency.to.toLowerCase(),
);
