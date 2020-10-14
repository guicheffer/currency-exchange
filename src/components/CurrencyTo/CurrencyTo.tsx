import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import { getBalanceExceeded } from '../../store/balances/balances.selectors';
import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../store/exchange/exchange.selectors';
import { getFromAmountValue } from '../../store/amounts/amounts.selectors';
import { setActiveTo } from '../../store/exchange/exchange.slices';
import DEFAULTS from '../../app/defaults';
import styles from './CurrencyTo.module.scss';

const makeGetFromAmountValue = () => getFromAmountValue;

export function CurrencyTo() {
  const currencyOrigin = useSelector(getExchangeIsoActiveTo);
  const currencyConvert = useSelector(getExchangeIsoActiveFrom);
  const hasBalanceExceeded = useSelector(getBalanceExceeded);

  const selectGetFromAmountValue = useMemo(makeGetFromAmountValue, []);
  const fromAmountValue = useSelector(selectGetFromAmountValue)?.value;

  return (
    <CurrencySelection
      type='to'
      currencyOrigin={currencyOrigin}
      currencyConvert={currencyConvert}
      setActive={setActiveTo}
    >
      <button
        disabled={Boolean(!fromAmountValue || hasBalanceExceeded)}
        className={styles.exchange}
        type='submit'
      > {DEFAULTS.APP.TRANSLATIONS?.EXCHANGE_ACTION} </button>
    </CurrencySelection>
  );
}
