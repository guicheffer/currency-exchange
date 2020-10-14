import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import './commons/styles/base.scss';
import { store } from './store/store';
import * as serviceWorker from './serviceWorker';
import CurrencyExchangeApp from './components/MainApp/MainApp';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrencyExchangeApp />
    </Provider>
  </React.StrictMode>,

  document.getElementById('currency-exchange-app')
);

serviceWorker.unregister();
