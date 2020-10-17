import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

export { pollWorker } from './pollWorker';
export { pollWatcher } from './pollWatcher';
