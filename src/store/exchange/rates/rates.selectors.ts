import { createSelector } from "reselect";

import { AmountValueState, CurrencySelectionType } from "../../amounts/amounts.slices";
import { getExchangeIsoActiveTo } from "../exchange.selectors";
import { RootState } from "../../store";

export const getConvertedRateFrom = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveTo(state),
  (state, currency) => {
    return { value: state.amounts.to.amount.value ? state.amounts.to.amount.value / state.rates[currency] : null };
  },
);

export const getConvertedRateTo = createSelector(
  (state: RootState) => state,
  (state) => getExchangeIsoActiveTo(state),
  (state, currency) => {
    return { value: state.amounts.from.amount.value ? state.rates[currency] * state.amounts.from.amount.value : null };
  },
);

export const getConvertedRate = createSelector(
  (state: RootState) => state,
  (_: any, type: CurrencySelectionType) => type,
  (state, type): AmountValueState => (type === 'from' ? getConvertedRateFrom(state) : getConvertedRateTo(state)),
);
