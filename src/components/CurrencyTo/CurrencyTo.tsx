import React from 'react';
import { useSelector } from 'react-redux';

import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../app/selectors/exchange';
import { setActiveTo } from '../../app/slices/exchange';
import styles from './CurrencyTo.module.scss';

export function CurrencyTo() {
  const currency = useSelector(getExchangeIsoActiveTo);
  const currencyTo = useSelector(getExchangeIsoActiveFrom);

  return (
    <CurrencySelection
      type='to'
      currency={currency}
      currencyTo={currencyTo}
      setActive={setActiveTo}
    >
      <button
        disabled
        className={styles.exchange}
        type='submit'
      > Exchange </button>
    </CurrencySelection>
  );
}
