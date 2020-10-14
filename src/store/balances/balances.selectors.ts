import { createSelector } from "reselect";

import { CurrencySchema } from "../../app/currencies";
import { getFromAmountValue } from "../amounts/amounts.selectors";
import { getExchangeIsoActiveFrom } from "../exchange/exchange.selectors";
import { getConvertedRateFrom } from "../exchange/rates/rates.selectors";
import { RootState } from "../store";

export const getBalanceExceeded = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveFrom(state),
  (state) => getFromAmountValue(state),
  (state, currency, { value }) => {
    const budgetToCompare = value || getConvertedRateFrom(state).value;
    return budgetToCompare && budgetToCompare > getCurrencyBalance(state, currency);
  },
);

export const getCurrencyBalance = createSelector(
  (state: RootState) => state,
  (_: any, currency: CurrencySchema['iso']) => currency,
  (state, currency) => state.balances[currency],
);
