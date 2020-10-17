import { call, delay, put } from 'redux-saga/effects';

import { WatchedPollingActionType } from './pollWatcher';
import { fetchForexRates } from '../services/fetch-forex-rates';
import { setPollingComplete, setPollingFailed } from '../polling.slices';
import { updateForexRates } from '../../exchange/rates/rates.slices';
import CONFIGS from '../../../app/configs';

export const thisFunctionIsSuperDummyFakeLog = console.error;

const POLLING_DURATION = CONFIGS.APP.POLLING_DURATION;

export function* pollWorker({ payload: baseCurrency }: WatchedPollingActionType) {
  while (true) {
    try {
      const { rates } = yield call(() => fetchForexRates(baseCurrency));
      yield put(setPollingComplete());
      yield put(updateForexRates(rates));
      yield delay(POLLING_DURATION);
    } catch (err) {
      // We could use kibana here, for instance, to track errors
      // For now let's stick with these fake ones haha...
      thisFunctionIsSuperDummyFakeLog(err);

      yield put(setPollingFailed());

      // Wait until next iteration
      yield delay(POLLING_DURATION);
    }
  }
}
