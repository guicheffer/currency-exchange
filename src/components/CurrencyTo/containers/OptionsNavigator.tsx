import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { beautifyCurrentRate, getLastTwoDigits } from '../../../commons/utils/display-current-rate/display-current-rate';
import { getAmountFrom, getAmountTo } from '../../../store/amounts/amounts.selectors';
import { getCurrentRate } from '../../../store/exchange/rates/rates.selectors';
import { getActiveSelectionType, getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../../store/exchange/exchange.selectors';
import { reverseCurrencies, setActiveExchange } from '../../../store/exchange/exchange.slices';
import { setAmountFrom, setAmountTo } from '../../../store/amounts/amounts.slices';
import CONFIGS from '../../../app/configs';
import styles from '../CurrencyTo.module.scss';

const makeGetFromAmountValue = () => getAmountFrom;
const makeGetToAmountValue = () => getAmountTo;

export function OptionsNavigator() {
  const dispatch = useDispatch();

  const currencyBase = useSelector(getExchangeIsoActiveFrom);
  const currencyTo = useSelector(getExchangeIsoActiveTo);
  const currentRate = useSelector(getCurrentRate);

  const activeSelectionType = useSelector(getActiveSelectionType);
  const isActiveTypeFrom = useMemo(() => activeSelectionType === 'from', [activeSelectionType]);
  const oppositeSelectionType = activeSelectionType === 'from' ? 'to' : 'from';

  const selectGetFromAmountValue = useMemo(makeGetFromAmountValue, []);
  const amountFrom = useSelector(selectGetFromAmountValue);

  const selectGetToAmountValue = useMemo(makeGetToAmountValue, []);
  const amountTo = useSelector(selectGetToAmountValue);

  const handleSwitch = useCallback(() => {
    dispatch(reverseCurrencies());
    dispatch(setActiveExchange(oppositeSelectionType));
    dispatch(isActiveTypeFrom ? setAmountTo(amountFrom) : setAmountFrom(amountTo));
  }, [amountFrom, amountTo, dispatch, isActiveTypeFrom, oppositeSelectionType]);

  // This will display the correct rate info (e.g. "£ 1 = € 1.17")
  const rateTextInfoItems = [
    /*  £   */  CONFIGS.APP.CURRENCIES[currencyBase].symbol,
    /*  1   */  CONFIGS.APP.TRANSLATIONS?.RATE_TEXT_BASE_AMOUNT,
    /*  =   */  CONFIGS.APP.TRANSLATIONS?.RATE_TEXT_COMPARISON_SYMBOL,
    /*  €   */  CONFIGS.APP.CURRENCIES[currencyTo].symbol,
    /* 1.29 */  beautifyCurrentRate(currentRate),
  ];

  return (
    <section className={`container ${styles.navigation}`} role='navigation' aria-label={CONFIGS.APP.TRANSLATIONS?.NAV_LABEL}>
      <button
        type='button'
        onClick={handleSwitch}
        className={styles.switchAction}
        title={CONFIGS.APP.TRANSLATIONS?.SWITCH_HELP_TEXT}
      > {CONFIGS.APP.TRANSLATIONS?.SWITCH_TEXT_SYMBOL} </button>

      <div className={styles.currentRateInfo}>
        <span className={styles.rateSymbol}> {CONFIGS.APP.TRANSLATIONS?.RATE_TEXT_SYMBOL} </span>

        {/* Current Rate based on the current base currency */}
        <span className={styles.rateText}>
          {rateTextInfoItems.join(' ')}

          {/* This will show a smaller version of the last two digits of current rate */}
          <small>{getLastTwoDigits(currentRate)}</small>
        </span>
      </div>
    </section>
  );
}
