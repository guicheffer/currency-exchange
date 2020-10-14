import React, { useCallback, useMemo, useState } from 'react';
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

  const [justExchanged, setJustExchanged] = useState(false);

  const currencyBase = useSelector(getExchangeIsoActiveTo);
  const currencyTo = useSelector(getExchangeIsoActiveFrom);
  const hasBalanceExceeded = useSelector(getBalanceExceeded);
  const hasMinimumAmount = useSelector(getMinimumAmountToExchange);

  const selectGetFromAmountValue = useMemo(makeGetFromAmountValue, []);
  const fromAmountValue = useSelector(selectGetFromAmountValue)?.value as number;

  const selectGetToAmountValue = useMemo(makeGetToAmountValue, []);
  const toAmountValue = useSelector(selectGetToAmountValue)?.value as number;

  const handleExchangeAction = useCallback(() => {
    if (!window.confirm(DEFAULTS.APP.TRANSLATIONS?.CONFIRM_EXCHANGE)) return false;
    setJustExchanged(true);

    dispatch(decrementBalance({
      currency: currencyTo,
      value: fromAmountValue,
    }));

    dispatch(incrementBalance({
      currency: currencyBase,
      value: toAmountValue,
    }));

    dispatch(setAmountValue['from']({ amount: { value: null } }));
    dispatch(setAmountValue['to']({ amount: { value: null } }));

    // This will basically animate the balance increment on the "currencyTo" section
    setTimeout(() => setJustExchanged(false), DEFAULTS.APP.TIMEOUT_JUST_EXCHANGED);
  }, [currencyTo, currencyBase, dispatch, fromAmountValue, toAmountValue]);

  return (
    <CurrencySelection
      type='to'
      currencyBase={currencyBase}
      currencyTo={currencyTo}
      setActive={setActiveTo}
      justExchanged={justExchanged}
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
