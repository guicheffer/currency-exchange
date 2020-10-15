import { useDispatch, useSelector } from 'react-redux';
import React, { FunctionComponent, ReactElement, useMemo } from 'react';

import { AmountInput } from './containers/AmountInput';
import { BalanceDisplay } from './containers/BalanceDisplay';

import { CurrencySchema } from '../../app/currencies';
import { CurrencySelectionType, setAmountValue } from '../../store/amounts/amounts.slices';
import { getCurrentBaseRate } from '../../store/exchange/rates/rates.selectors';
import { getFromAmountValue, getToAmountValue } from '../../store/amounts/amounts.selectors';
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
  const isTypeFrom = useMemo(() => type === 'from', [type]);

  const currentAmount = useSelector(isTypeFrom ? getFromAmountValue : getToAmountValue);
  const currentRate = useSelector(getCurrentBaseRate);

  const handleSelection = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    const selectedIso = event.currentTarget.value;

    // TODO: Dispatch polling from `fromAmount` as the `base` currency for our rates
    // TODO: Do we do that here?

    if (selectedIso === currencyTo) {
      dispatch(reverseCurrencies());
    } else {
      dispatch(setActive(selectedIso));
    }

    dispatch(setAmountValue[type]({ amount: currentAmount, currentRate }));
  };

  return (
    <section className={`${styles.row} currency-exchange-section currency-exchange-section--${type}`}>
      <div className={`container ${!isTypeFrom ? 'container__to' : ''}`}>
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
