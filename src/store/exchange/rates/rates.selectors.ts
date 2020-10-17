import { createSelector } from 'reselect';

import { getExchangeIsoActiveTo } from '../exchange.selectors';
import { RootState } from '../../store';

export const getCurrentRate = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveTo(state),
  (state, currency) => state.rates.forex[currency],
);
