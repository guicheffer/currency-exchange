import React from 'react';

import { CurrencyFrom } from '../CurrencyFrom/CurrencyFrom';
import { CurrencyTo } from '../CurrencyTo/CurrencyTo';

// TODO: Remove it
// import { Counter } from '../Counter/Counter';

function MainApp() {
  return (
    <div className='MainApp'>
      <CurrencyFrom />
      <CurrencyTo />

      {/* TODO: Remove this */}
      {/* <Counter /> */}
    </div>
  );
}

export default MainApp;
