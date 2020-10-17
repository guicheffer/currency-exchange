import { createSelector } from 'reselect';

import { RootState } from '../store';
import { PollingState } from './polling.slices';

const getPollingProgress = createSelector(
  (state: RootState) => state,
  (state) => state.polling.progress as PollingState,
);

export const isPollingFailed = createSelector(
  (state: RootState) => state,
  (state) => getPollingProgress(state) === PollingState.FAILED,
);

export const isPollingLoading = createSelector(
  (state: RootState) => state,
  (state) => {
    const pollingStateProgress = getPollingProgress(state);
    return pollingStateProgress === PollingState.STARTED || pollingStateProgress === PollingState.FAILED;
  },
);
