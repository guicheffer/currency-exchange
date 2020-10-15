import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OptionsNavigator } from './containers/OptionsNavigator';

import { decrementBalance, incrementBalance } from '../../store/balances/balances.slices';
import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import { getBalanceExceeded } from '../../store/balances/balances.selectors';
import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../store/exchange/exchange.selectors';
import { getFromAmountValue, getMinimumAmountToExchange, getToAmountValue } from '../../store/amounts/amounts.selectors';
import { setCurrencyActiveTo } from '../../store/exchange/exchange.slices';
import { clearAmounts } from '../../store/amounts/amounts.slices';
import CONFIGS from '../../app/configs';
import styles from './CurrencyTo.module.scss';

const makeGetFromAmountValue = () => getFromAmountValue;
const makeGetToAmountValue = () => getToAmountValue;

export function CurrencyTo() {
  const dispatch = useDispatch();

  const [justExchangedState, setJustExchangedState] = useState(false);

  const currencyBase = useSelector(getExchangeIsoActiveTo);
  const currencyTo = useSelector(getExchangeIsoActiveFrom);
  const hasBalanceExceeded = useSelector(getBalanceExceeded);
  const hasMinimumAmount = useSelector(getMinimumAmountToExchange);

  const selectGetFromAmountValue = useMemo(makeGetFromAmountValue, []);
  const fromAmountValue = useSelector(selectGetFromAmountValue)?.value as number;

  const selectGetToAmountValue = useMemo(makeGetToAmountValue, []);
  const toAmountValue = useSelector(selectGetToAmountValue)?.value as number;

  const handleExchangeAction = useCallback(() => {
    if (!window.confirm(CONFIGS.APP.TRANSLATIONS?.CONFIRM_EXCHANGE)) return false;
    setJustExchangedState(true);

    dispatch(decrementBalance({
      currency: currencyTo,
      value: fromAmountValue,
    }));

    dispatch(incrementBalance({
      currency: currencyBase,
      value: toAmountValue,
    }));

    dispatch(clearAmounts());

    // This will basically animate the balance increment on the "currencyTo" section
    setTimeout(() => setJustExchangedState(false), CONFIGS.APP.TIMEOUT_JUST_EXCHANGED);
  }, [currencyTo, currencyBase, dispatch, fromAmountValue, toAmountValue]);

  return (
    <>
      <OptionsNavigator />

      <CurrencySelection
        type='to'
        currencyBase={currencyBase}
        currencyTo={currencyTo}
        setLocalCurrency={setCurrencyActiveTo}
        justExchanged={justExchangedState}
      >
        <button
          type='submit'
          disabled={Boolean(!fromAmountValue || !hasMinimumAmount || hasBalanceExceeded)}
          className={styles.exchangeAction}
          onClick={handleExchangeAction}
        > {CONFIGS.APP.TRANSLATIONS?.EXCHANGE_ACTION} </button>
      </CurrencySelection>
    </>
  );
}
