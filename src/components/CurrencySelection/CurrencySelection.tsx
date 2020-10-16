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

  const isSelectionTypeFrom = useMemo(() => type === 'from', [type]);

  const handleSelection = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    const selectedCurrency = event.currentTarget.value;

    // TODO: Dispatch polling from `amountFrom` as the `base` currency for our rates

    // If selected currency is the same as the one to convert, invert them;
    // Otherwise , change its active currency to the one selected.
    if (convertCurrency === selectedCurrency) {
      dispatch(reverseCurrencies());
    } else {
      dispatch(changeActiveCurrency(selectedCurrency));
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
          <select value={activeCurrency} className={styles.currency} onChange={handleSelection}>
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
          currency={activeCurrency}
          justExchanged={justExchanged}
        />
      </div>

      {children}
    </section>
  );
}
