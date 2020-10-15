import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { reverseAmounts } from '../../../store/amounts/amounts.slices';
import { reverseCurrencies } from '../../../store/exchange/exchange.slices';
import CONFIGS from '../../../app/configs';
import styles from '../CurrencyTo.module.scss';
import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../../store/exchange/exchange.selectors';

export function OptionsNavigator() {
  const dispatch = useDispatch();

  const currencyBase = useSelector(getExchangeIsoActiveFrom);

  const handleSwitch = useCallback(() => {
    dispatch(reverseCurrencies());
    dispatch(reverseAmounts());
  }, [dispatch]);

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

        {/* Current Rate based on the base currency */}
        <span className={styles.rateText}>
          1euro = 2
        </span>
      </div>
    </section>
  );
}
