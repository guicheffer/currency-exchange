import { useDispatch, useSelector } from 'react-redux';
import React, { FunctionComponent, ReactElement, useMemo } from 'react';

import { AmountInput } from './AmountInput';
import { CurrencySchema } from '../../app/currencies';
import { CurrencySelectionType } from '../../store/amounts/amounts.slices';
import { formatAmount } from '../../commons/utils/format-amount/format-amount';
import { getBalanceExceeded, getCurrencyBalance } from '../../store/balances/balances.selectors';
import { getMinimumAmountToExchange } from '../../store/amounts/amounts.selectors';
import { reverseCurrencies } from '../../store/exchange/exchange.slices';
import { RootState } from '../../store/store';
import DEFAULTS from '../../app/defaults';
import styles from './CurrencySelection.module.scss';

interface CurrencySelectionProps {
  currencyOrigin: CurrencySchema['iso'];
  currencyConvert: CurrencySchema['iso'];
  setActive: Function;
  type: CurrencySelectionType;
  justExchanged?: Boolean;
}

const makeGetCurrencyBalance = () => getCurrencyBalance;

export const CurrencySelection: FunctionComponent<CurrencySelectionProps> = ({
  children,
  currencyOrigin,
  currencyConvert,
  setActive,
  type,
  justExchanged = false,
}): ReactElement => {
  const dispatch = useDispatch();
  const isSelectionTypeFrom = useMemo(() => type === 'from', [type]);
  const selectCurrencyBalance = useMemo(makeGetCurrencyBalance, []);
  const currencyBalance = useSelector((state: RootState) => selectCurrencyBalance(state, currencyOrigin));
  const hasBalanceExceeded = useSelector(getBalanceExceeded);
  const hasMinimumAmount = useSelector(getMinimumAmountToExchange);

  const handleSelection = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    const selectedIso = event.currentTarget.value;

    // TODO: Dispatch polling from `fromAmount` as the `base` currency for our rates

    if (selectedIso === currencyConvert) {
      dispatch(reverseCurrencies());
    } else {
      dispatch(setActive(selectedIso));
    }
  };

  return (
    <section className={`${styles.row} currency-exchange-section currency-exchange-section--${type}`}>
      <div className={`${styles.container} ${!isSelectionTypeFrom ? styles.container__to : ''}`}>
        <form
          autoComplete='off'
          className={styles.selection}
          onSubmit={e => e.preventDefault()}
        >
          <select value={currencyOrigin} className={styles.currency} onChange={handleSelection}>
            {Object.entries(DEFAULTS.APP.CURRENCIES).map(([currencyKey, { iso }]) => (<option key={currencyKey} value={iso}>{iso}</option>))}
          </select>

          <AmountInput type={type} />
        </form>

        <section className={styles.display}>
          <p className={`${styles.balance} ${justExchanged ? styles.balanceJustExchanged : ''}`}>
            {DEFAULTS.APP.TRANSLATIONS?.BALANCE}: {formatAmount(currencyBalance, currencyOrigin)}
          </p>

          {
            isSelectionTypeFrom && hasBalanceExceeded && <p> {DEFAULTS.APP.TRANSLATIONS?.BALANCE_EXCEEDED} </p>
          }

          {
            isSelectionTypeFrom && !hasMinimumAmount &&
            <p className={`${styles.warning}`}>
              {DEFAULTS.APP.TRANSLATIONS?.MINIMUM_EXPECTED} {formatAmount(DEFAULTS.APP.CURRENCIES[currencyOrigin.toLowerCase()].minimum, currencyOrigin)}
            </p>
          }
        </section>
      </div>

      {children}
    </section>
  );
}
