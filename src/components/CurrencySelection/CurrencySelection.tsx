import { useDispatch, useSelector } from 'react-redux';
import React, { FunctionComponent, KeyboardEvent, SyntheticEvent, useMemo } from 'react';

import {
  CurrencySelectionType,
  setAmountValue,
} from '../../app/slices/currencies/currencies';

import { RootState } from '../../app/store';
import appStyles from '../../commons/styles/app.module.scss';
import DEFAULTS from '../../app/defaults';
import {
  maskAmount,
  removeMask,
} from '../../commons/utils/format-amount';

type CurrencySelectionProps = {
  type: CurrencySelectionType;
}

export const CurrencySelection: FunctionComponent<CurrencySelectionProps> = ({ children, ...props }) => {
  const selectionType = props.type;
  const dispatch = useDispatch();
  const isAmountFrom = useMemo(() => selectionType === 'from', [selectionType]);
  const amount = useSelector((state: RootState) => state.currencies.currency[selectionType].amount);

  const handleAmountChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    const inputValue = event.currentTarget.value;
    const rawValue = parseFloat(removeMask(inputValue));
    const value = !Number.isNaN(rawValue) ? rawValue : null;

    const hasDecimalsStarted = inputValue[inputValue.length - 1] === ',';
    dispatch(setAmountValue[selectionType]({ hasDecimalsStarted, value }));
  }

  const handleAmountKeyPress = (
    event: KeyboardEvent<HTMLInputElement>,
  ): void => {
    const amountValue = event.currentTarget.value;

    const pressedKeyString = String.fromCharCode(event.which);
    const permittedValueRegex = /^[\d|.| |+|-]+?(?=(,\d{0,1}$)|$)/;
    const allowedKeysRegex = /\d|,/;

    if (
      (amountValue === '' && pressedKeyString === ',') ||
      !allowedKeysRegex.test(pressedKeyString) ||

      (amountValue &&
      !permittedValueRegex.test(amountValue) &&
      event.keyCode !== DEFAULTS.KEYCODES.DELETE)
    ) return event.preventDefault();
  }

  return (<section className={`${appStyles.row} currency-exchange-section currency-exchange-section--${selectionType}`}>
    <form
      autoComplete='off'
      className={`${appStyles.display} ${!isAmountFrom ? appStyles.displayTo : ''}`}
      onSubmit={e => e.preventDefault()}
    >
      <select defaultValue={DEFAULTS.APP.CURRENCY} className={appStyles.currency} name='currency'>
        <option value='eur'>EUR</option>
        <option value='gbp'>GBP</option>
        <option value='usd'>USD</option>
      </select>

      <input
        type='text'
        name={`amount-${selectionType}`}
        inputMode='decimal'
        autoFocus={isAmountFrom}
        maxLength={Number.MAX_SAFE_INTEGER.toString().length}
        className={appStyles.amount}
        placeholder='0'
        onChange={handleAmountChange}
        onKeyPress={handleAmountKeyPress}
        onPaste={e => e.preventDefault()}
        value={maskAmount(amount, selectionType)}
      />
    </form>

    {/* TODO: Remove it */}
    <p style={{position: 'absolute', bottom: '0', right: '16px'}}> {amount.value} </p>

    {children}
  </section>)
}
