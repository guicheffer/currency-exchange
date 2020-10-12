import React from 'react';

import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import styles from './CurrencyTo.module.scss';

export function CurrencyTo() {
  return (
    <CurrencySelection type='to'>
      <button
        disabled
        className={styles.exchange}
        type='submit'
      > Exchange </button>
    </CurrencySelection>
  );
}
