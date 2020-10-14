import { createSelector } from "reselect";

import { CurrencySchema } from "../../app/currencies";
import { getFromAmountValue } from "../amounts/amounts.selectors";
import { getExchangeIsoActiveFrom } from "../exchange/exchange.selectors";
import { RootState } from "../store";

export const getBalanceExceeded = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveFrom(state),
  (state) => getFromAmountValue(state),
  (state, currency, { value }) => (value && value > getCurrencyBalance(state, currency)) || null,
);

export const getCurrencyBalance = createSelector(
  (state: RootState) => state,
  (_: any, currency: CurrencySchema['iso']) => currency,
  (state, currency) => state.balances[currency],
);
