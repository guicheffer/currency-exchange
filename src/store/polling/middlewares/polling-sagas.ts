import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export { pollingWorker } from './polling-worker';
export { pollingWatcher } from './polling-watcher';
