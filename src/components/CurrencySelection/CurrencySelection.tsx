import { useDispatch, useSelector } from 'react-redux';
import React, { FunctionComponent, ReactElement, useMemo } from 'react';

import { AmountInput } from './AmountInput';
import { CurrencySchema } from '../../app/defaults/currencies';
import { CurrencySelectionType } from '../../app/slices/amounts';
import { getFromAmountValue, getToAmountValue } from '../../app/selectors/amounts';
import { reverseCurrencies } from '../../app/slices/exchange';
import DEFAULTS from '../../app/defaults/defaults';
import styles from './CurrencySelection.module.scss';

interface CurrencySelectionProps {
  currency: CurrencySchema['iso'];
  currencyTo: CurrencySchema['iso'];
  setActive: Function;
  type: CurrencySelectionType;
}

export const CurrencySelection: FunctionComponent<CurrencySelectionProps> = ({ children, ...props }): ReactElement => {
  const dispatch = useDispatch();
  const isAmountTypeFrom = useMemo(() => props.type === 'from', [props.type]);

  // TODO: Remove it!
  const currentAmount = useSelector(isAmountTypeFrom ? getFromAmountValue : getToAmountValue);

  const handleSelection = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    const selectedIso = event.currentTarget.value;

    if (selectedIso === props.currencyTo) {
      dispatch(reverseCurrencies());
    } else {
      dispatch(props.setActive(selectedIso));
    }
  };

  return (
    <section className={`${styles.row} currency-exchange-section currency-exchange-section--${props.type}`}>
      <form
        autoComplete='off'
        className={`${styles.display} ${!isAmountTypeFrom ? styles.display_to : ''}`}
        onSubmit={e => e.preventDefault()}
      >
        <select value={props.currency} className={styles.currency} onChange={handleSelection}>
          {Object.entries(DEFAULTS.APP.CURRENCIES).map(([currencyKey, { iso }]) => (<option key={currencyKey} value={iso}>{iso}</option>))}
        </select>

        <AmountInput type={props.type} />
      </form>

      {/* TODO: Remove it! */}
      <p style={{position: 'absolute', bottom: '0', right: '16px'}}> {props.currency} -  {currentAmount.value} </p>

      {children}
    </section>
  );
}
