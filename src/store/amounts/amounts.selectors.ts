import { createSelector } from "reselect";

import { RootState } from "../store";

export const getFromAmountValue = createSelector(
  (state: RootState) => state,
  (state) => state.amounts.from.amount,
);

export const getToAmountValue = createSelector(
  (state: RootState) => state,
  (state) => state.amounts.to.amount,
);
