import React from 'react';

import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import appStyles from '../../commons/styles/app.module.scss';

export function CurrencyTo() {
  return (
    <CurrencySelection type='to'>
      <button
        disabled
        className={appStyles.exchange}
        type='submit'
      > Exchange </button>
    </CurrencySelection>
  );
}
