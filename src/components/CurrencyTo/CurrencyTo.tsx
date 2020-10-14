import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { decrementBalance, incrementBalance } from '../../store/balances/balances.slices';
import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import { getBalanceExceeded } from '../../store/balances/balances.selectors';
import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../store/exchange/exchange.selectors';
import { getFromAmountValue, getMinimumAmountToExchange, getToAmountValue } from '../../store/amounts/amounts.selectors';
import { setActiveTo } from '../../store/exchange/exchange.slices';
import { setAmountValue } from '../../store/amounts/amounts.slices';
import DEFAULTS from '../../app/defaults';
import styles from './CurrencyTo.module.scss';

const makeGetFromAmountValue = () => getFromAmountValue;
const makeGetToAmountValue = () => getToAmountValue;

export function CurrencyTo() {
  const dispatch = useDispatch();

  const currencyOrigin = useSelector(getExchangeIsoActiveTo);
  const currencyConvert = useSelector(getExchangeIsoActiveFrom);
  const hasBalanceExceeded = useSelector(getBalanceExceeded);
  const hasMinimumAmount = useSelector(getMinimumAmountToExchange);

  const selectGetFromAmountValue = useMemo(makeGetFromAmountValue, []);
  const fromAmountValue = useSelector(selectGetFromAmountValue)?.value as number;

  const selectGetToAmountValue = useMemo(makeGetToAmountValue, []);
  const toAmountValue = useSelector(selectGetToAmountValue)?.value as number;

  const handleExchangeAction = useCallback(() => {
    if (!window.confirm(DEFAULTS.APP.TRANSLATIONS?.CONFIRM_EXCHANGE)) return false;

    dispatch(decrementBalance({
      currency: currencyConvert,
      value: fromAmountValue,
    }));

    dispatch(incrementBalance({
      currency: currencyOrigin,
      value: toAmountValue,
    }));

    dispatch(setAmountValue['from']({ amount: { value: null } }));
    dispatch(setAmountValue['to']({ amount: { value: null } }));
  }, [currencyConvert, currencyOrigin, dispatch, fromAmountValue, toAmountValue]);

  return (
    <CurrencySelection
      type='to'
      currencyOrigin={currencyOrigin}
      currencyConvert={currencyConvert}
      setActive={setActiveTo}
    >
      <button
        type='submit'
        disabled={Boolean(!fromAmountValue || !hasMinimumAmount || hasBalanceExceeded)}
        className={styles.exchange}
        onClick={handleExchangeAction}
      > {DEFAULTS.APP.TRANSLATIONS?.EXCHANGE_ACTION} </button>
    </CurrencySelection>
  );
}
