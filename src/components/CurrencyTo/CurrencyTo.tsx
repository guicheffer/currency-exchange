import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OptionsNavigator } from './containers/OptionsNavigator';

import { decrementBalance, incrementBalance } from '../../store/balances/balances.slices';
import { clearAmountValues } from '../../store/amounts/amounts.slices';
import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import { getBalanceExceeded } from '../../store/balances/balances.selectors';
import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../store/exchange/exchange.selectors';
import { getAmountFrom, getMinimumAmountToExchange, getAmountTo } from '../../store/amounts/amounts.selectors';
import { setCurrencyActiveTo } from '../../store/exchange/exchange.slices';
import CONFIGS from '../../app/configs';
import styles from './CurrencyTo.module.scss';

const makeGetFromAmountValue = () => getAmountFrom;
const makeGetToAmountValue = () => getAmountTo;

export function CurrencyTo() {
  const dispatch = useDispatch();

  const [justExchangedState, setJustExchangedState] = useState(false);

  const activeCurrency = useSelector(getExchangeIsoActiveTo);
  const convertCurrency = useSelector(getExchangeIsoActiveFrom);

  const hasBalanceExceededValue = useSelector(getBalanceExceeded);
  const hasMinimumAmountValue = useSelector(getMinimumAmountToExchange);

  const selectGetFromAmountValue = useMemo(makeGetFromAmountValue, []);
  const amountFromValue = useSelector(selectGetFromAmountValue)?.value as number;

  const selectGetToAmountValue = useMemo(makeGetToAmountValue, []);
  const amountToValue = useSelector(selectGetToAmountValue)?.value as number;

  const handleExchangeAction = useCallback(() => {
    if (!window.confirm(CONFIGS.APP.TRANSLATIONS?.CONFIRM_EXCHANGE)) return false;
    setJustExchangedState(true);

    dispatch(decrementBalance({ currency: convertCurrency, value: amountFromValue }));
    dispatch(incrementBalance({ currency: activeCurrency, value: amountToValue }));
    dispatch(clearAmountValues());

    // This will basically animate the balance increment display on the "convertCurrency" section
    setTimeout(() => setJustExchangedState(false), CONFIGS.APP.TIMEOUT_JUST_EXCHANGED);
  }, [activeCurrency, amountFromValue, amountToValue, convertCurrency, dispatch]);

  return (
    <>
      <OptionsNavigator />

      <CurrencySelection
        type='to'
        activeCurrency={activeCurrency}
        convertCurrency={convertCurrency}
        changeActiveCurrency={setCurrencyActiveTo}
        justExchanged={justExchangedState}
      >
        <button
          type='submit'
          disabled={Boolean(!amountFromValue || !hasMinimumAmountValue || hasBalanceExceededValue)}
          className={styles.exchangeAction}
          onClick={handleExchangeAction}
        > {CONFIGS.APP.TRANSLATIONS?.EXCHANGE_ACTION} </button>
      </CurrencySelection>
    </>
  );
}
