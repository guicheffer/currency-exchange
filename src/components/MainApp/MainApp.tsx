import React from 'react';

import { CurrencyFrom } from '../CurrencyFrom/CurrencyFrom';
import { CurrencyTo } from '../CurrencyTo/CurrencyTo';

function MainApp() {
  return (
    <div className='CurrencyExchangeMainApp' data-testid='main-app'>
      <CurrencyFrom />
      <CurrencyTo />
    </div>
  );
}

export default MainApp;
