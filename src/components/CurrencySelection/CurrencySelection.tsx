import { useDispatch } from 'react-redux';
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useMemo } from 'react';

import { AmountInput } from './containers/AmountInput';
import { BalanceDisplay } from './containers/BalanceDisplay';

import { CurrencySchema } from '../../app/currencies';
import { CurrencySelectionType } from '../../store/amounts/amounts.slices';
import { reverseCurrencies } from '../../store/exchange/exchange.slices';
import { setPollingStarted, setPollingStopped } from '../../store/polling/polling.slices';
import CONFIGS from '../../app/configs';
import styles from './CurrencySelection.module.scss';

interface CurrencySelectionProps {
  type: CurrencySelectionType;
  activeCurrency: CurrencySchema['iso'];
  convertCurrency: CurrencySchema['iso'];
  changeActiveCurrency: Function;
  justExchanged?: Boolean;
}

export const CurrencySelection: FunctionComponent<CurrencySelectionProps> = ({ children, ...props }): ReactElement => {
  const {
    type,
    activeCurrency,
    convertCurrency,
    changeActiveCurrency,
    justExchanged = false,
  } = props;

  const dispatch = useDispatch();

  // This will start polling on the first rendering
  // **ps**. this will also ignore eslint since it takes `dispatch` as modifiers only
  // eslint-disable-next-line
  useEffect(() => { dispatch(setPollingStarted(activeCurrency)) }, [dispatch]);

  const isSelectionTypeFrom = useMemo(() => type === 'from', [type]);

  const handleSelection = useCallback((event: React.SyntheticEvent<HTMLSelectElement>) => {
    const selectedCurrency = event.currentTarget.value;
    const isCurrencyReversing = convertCurrency === selectedCurrency;

    // We'll change it's polling base only if:
    // - `currency` is reversing (when user selects the same customer or vice-versa);
    // - `from` currency is changed;
    if (isCurrencyReversing || isSelectionTypeFrom) {
      dispatch(setPollingStopped());

      if (isCurrencyReversing && !isSelectionTypeFrom) {
        dispatch(setPollingStarted(activeCurrency))
      } else {
        dispatch(setPollingStarted(selectedCurrency))
      }
    }

    // If selected currency is the same as the one to convert, invert them;
    // Otherwise , change its active currency to the one selected.
    if (isCurrencyReversing) {
      dispatch(reverseCurrencies());
    } else {
      dispatch(changeActiveCurrency(selectedCurrency));
    }
  }, [activeCurrency, changeActiveCurrency, convertCurrency, dispatch, isSelectionTypeFrom]);

  return (
    <section className={`${styles.row} currency-exchange-section currency-exchange-section--${type}`}>
      <div className={`container ${!isSelectionTypeFrom ? 'container__to' : ''}`}>
        <form
          autoComplete='off'
          className={styles.selection}
          onSubmit={e => e.preventDefault()}
        >
          <select value={activeCurrency} className={styles.currency} onChange={handleSelection}>
            {
              Object.entries(CONFIGS.APP.CURRENCIES).map(
                ([currencyIndexKey, { iso, key }]) => {
                  return <option data-testid={`currency-${key}`} key={currencyIndexKey} value={key}>{iso}</option>;
                }
              )
            }
          </select>

          <AmountInput type={type} />
        </form>

        <BalanceDisplay
          type={type}
          currency={activeCurrency}
          justExchanged={justExchanged}
        />
      </div>

      {children}
    </section>
  );
}
