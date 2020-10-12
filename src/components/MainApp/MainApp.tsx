import React from 'react';

import { CurrencyFrom } from '../CurrencyFrom/CurrencyFrom';
import { CurrencyTo } from '../CurrencyTo/CurrencyTo';

function MainApp() {
  return (
    <div className='MainApp'>
      <CurrencyFrom />
      <CurrencyTo />
    </div>
  );
}

export default MainApp;
