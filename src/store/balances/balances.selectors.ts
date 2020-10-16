import { createSelector } from 'reselect';

import { CurrencySchema } from '../../app/currencies';
import { getAmountFrom } from '../amounts/amounts.selectors';
import { getExchangeIsoActiveFrom } from '../exchange/exchange.selectors';
import { RootState } from '../store';

export const getCurrencyBalance = createSelector(
  (state: RootState) => state,
  (_: any, currency: CurrencySchema['iso']) => currency,
  (state, currency) => state.balances[currency],
);

export const getBalanceExceeded = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveFrom(state),
  (state) => getAmountFrom(state),
  (state, currency, { value }) => (value !== null && value > getCurrencyBalance(state, currency)) ?? null,
);
