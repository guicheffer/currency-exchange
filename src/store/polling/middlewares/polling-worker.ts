import { call, delay, put } from 'redux-saga/effects';

import { WatchedPollingActionType } from './polling-watcher';
import { fetchForexRates } from '../services/fetch-forex-rates';
import { setPollingComplete, setPollingFailed } from '../polling.slices';
import { updateForexRates } from '../../exchange/rates/rates.slices';
import CONFIGS from '../../../app/configs';

export const thisFunctionIsSuperDummyFakeLog = console.error;

const POLLING_DURATION = CONFIGS.APP.POLLING_DURATION;

/**
 *
 * I started debugging this a bit myself and ended up seeing a lack of performance around here.
 *
 * In order to solve lots of requests at once, we could:
 * - start polling relying on a debouncer
 *   which could essentially prevent other api calls once it's failed;
 * - or even create a service worker for the browser and do everything in self-contained mode,
 *   that way would facilitate its data to come to the internal redux state;
 * - decrease timeouts around the calls and check its reliability on datadog, for example;
 *
 */

export function* pollingWorker({ payload: baseCurrency }: WatchedPollingActionType) {
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
