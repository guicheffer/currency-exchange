import { useSelector } from 'react-redux';
import React, { FunctionComponent, ReactElement, useMemo } from 'react';

import { AmountInput } from './AmountInput';
import { CurrencySelectionType } from '../../app/slices/amounts';
import { RootState } from '../../app/store';
import DEFAULTS from '../../app/defaults/defaults';
import styles from './CurrencySelection.module.scss';

export const CurrencySelection: FunctionComponent<{ type: CurrencySelectionType; }> = ({ children, ...props }): ReactElement => {
  const isAmountTypeFrom = useMemo(() => props.type === 'from', [props.type]);
  const amountValue = useSelector((state: RootState) => state.amounts[props.type].amount);

  return (<section className={`${styles.row} currency-exchange-section currency-exchange-section--${props.type}`}>
    <form
      autoComplete='off'
      className={`${styles.display} ${!isAmountTypeFrom ? styles.display_to : ''}`}
      onSubmit={e => e.preventDefault()}
    >
      <select defaultValue={DEFAULTS.APP.CURRENCY[props.type].iso} className={styles.currency}>
        {Object.entries(DEFAULTS.APP.CURRENCIES).map(([currencyKey, { iso }]) => (<option key={currencyKey} value={iso}>{iso}</option>))}
      </select>

      <AmountInput type={props.type} />
    </form>

    {/* TODO: Remove it */}
    <p style={{position: 'absolute', bottom: '0', right: '16px'}}> {amountValue.value} </p>

    {children}

  </section>)
}
