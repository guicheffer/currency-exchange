import { createSelector } from 'reselect';

import { RootState } from '../store';
import { PollingState } from './polling.slices';

const getPollingProgress = createSelector(
  (state: RootState) => state,
  (state) => state.polling.progress as PollingState,
);

export const isPollingLoading = createSelector(
  (state: RootState) => state,
  (state) => getPollingProgress(state) === PollingState.STARTED,
);
