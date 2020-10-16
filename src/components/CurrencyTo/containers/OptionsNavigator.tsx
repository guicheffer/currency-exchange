import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentRate } from '../../../store/exchange/rates/rates.selectors';
import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../../store/exchange/exchange.selectors';
import { reverseCurrencies } from '../../../store/exchange/exchange.slices';
import CONFIGS from '../../../app/configs';
import getLastTwoDigits from '../../../commons/utils/get-last-two-digits/get-last-two-digits';
import styles from '../CurrencyTo.module.scss';
import roundDown from '../../../commons/utils/round-down/round-down';

export function OptionsNavigator() {
  const dispatch = useDispatch();

  const currencyBase = useSelector(getExchangeIsoActiveFrom);
  const currencyTo = useSelector(getExchangeIsoActiveTo);
  const currentRate = useSelector(getCurrentRate);

  const handleSwitch = useCallback(() => dispatch(reverseCurrencies()), [dispatch]);

  // This will display the correct rate info (e.g. "£ 1 = € 1.17")
  const rateTextInfoItems = [
    /*  £   */  CONFIGS.APP.CURRENCIES[currencyBase].symbol,
    /*  1   */  CONFIGS.APP.TRANSLATIONS?.RATE_TEXT_BASE_AMOUNT,
    /*  =   */  CONFIGS.APP.TRANSLATIONS?.RATE_TEXT_COMPARISON_SYMBOL,
    /*  €   */  CONFIGS.APP.CURRENCIES[currencyTo].symbol,
    /* 1.29 */  roundDown(currentRate).toFixed(CONFIGS.APP.MAX_FRACTION_DIGITS),
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
