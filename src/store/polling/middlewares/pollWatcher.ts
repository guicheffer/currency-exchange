import { call, take, race } from 'redux-saga/effects';

import {
  setPollingStarted,
  setPollingStopped,
} from '../polling.slices';
import { CurrencySchema } from '../../../app/currencies';
import { pollWorker } from './pollWorker';

export type WatchedPollingActionType = {
  type: typeof setPollingStarted.type;
  payload: CurrencySchema['iso'];
};

export function* pollWatcher() {
  while (true) {
    const action: WatchedPollingActionType = yield take(setPollingStarted.type);

    yield race([
      call(() => pollWorker(action)),
      take(setPollingStopped.type),
    ]);
  }
}
