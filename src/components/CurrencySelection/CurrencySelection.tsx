import { useDispatch } from 'react-redux';
import React, { FunctionComponent, ReactElement, useMemo } from 'react';

import { AmountInput } from './containers/AmountInput';
import { BalanceDisplay } from './containers/BalanceDisplay';

import { CurrencySchema } from '../../app/currencies';
import { CurrencySelectionType } from '../../store/amounts/amounts.slices';
import { reverseCurrencies } from '../../store/exchange/exchange.slices';
import CONFIGS from '../../app/configs';
import styles from './CurrencySelection.module.scss';

interface CurrencySelectionProps {
  currencyBase: CurrencySchema['iso'];
  currencyTo: CurrencySchema['iso'];
  setActive: Function;
  type: CurrencySelectionType;
  justExchanged?: Boolean;
}

export const CurrencySelection: FunctionComponent<CurrencySelectionProps> = ({
  type,
  children,
  currencyBase,
  currencyTo,
  setActive,
  justExchanged = false,
}): ReactElement => {
  const dispatch = useDispatch();
  const isSelectionTypeFrom = useMemo(() => type === 'from', [type]);

  const handleSelection = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    const selectedIso = event.currentTarget.value;

    // TODO: Dispatch polling from `fromAmount` as the `base` currency for our rates
    // TODO: Do we do that here?

    if (selectedIso === currencyTo) {
      dispatch(reverseCurrencies());
    } else {
      dispatch(setActive(selectedIso));
    }
  };

  return (
    <section className={`${styles.row} currency-exchange-section currency-exchange-section--${type}`}>
      <div className={`container ${!isSelectionTypeFrom ? 'container__to' : ''}`}>
        <form
          autoComplete='off'
          className={styles.selection}
          onSubmit={e => e.preventDefault()}
        >
          <select value={currencyBase} className={styles.currency} onChange={handleSelection}>
            {
              Object.entries(CONFIGS.APP.CURRENCIES).map(
                ([currencyIndexKey, { iso, key }]) => {
                  return <option key={currencyIndexKey} value={key}>{iso}</option>;
                }
              )
            }
          </select>

          <AmountInput type={type} />
        </form>

        <BalanceDisplay
          type={type}
          currency={currencyBase}
          justExchanged={justExchanged}
        />
      </div>

      {children}
    </section>
  );
}
