import { useDispatch, useSelector } from 'react-redux';
import React, { FunctionComponent, KeyboardEvent, SyntheticEvent, useMemo } from 'react';

import {
  CurrencySelectionType,
  setAmountValue,
} from '../../app/slices/currencies/amounts';

import { RootState } from '../../app/store';
import appStyles from '../../commons/styles/app.module.scss';
import DEFAULTS from '../../app/defaults';
import {
  maskAmountValue,
  removeMaskFromInputValue,
} from '../../commons/utils/format-amount';

type CurrencySelectionProps = {
  type: CurrencySelectionType;
}

export const CurrencySelection: FunctionComponent<CurrencySelectionProps> = ({ children, ...props }) => {
  const selectionType = props.type;

  const isAmountTypeFrom = useMemo(() => selectionType === 'from', [selectionType]);
  const amountValue = useSelector((state: RootState) => state.amounts[selectionType].amount);

  const dispatch = useDispatch();

  const handleAmountChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    const inputValue = event.currentTarget.value;
    const rawValue = parseFloat(removeMaskFromInputValue(inputValue));
    const value = !Number.isNaN(rawValue) ? rawValue : null;

    const hasDecimalsStarted = inputValue[inputValue.length - 1] === ',';
    dispatch(setAmountValue[selectionType]({ hasDecimalsStarted, value }));
  }

  const shouldAllowKeyPress = (
    event: KeyboardEvent<HTMLInputElement>,
  ): void => {
    const amountValue = event.currentTarget.value;

    const pressedKeyString = String.fromCharCode(event.which);
    const permittedValueRegex = /^[\d|.| |+|-]+?(?=(,\d{0,1}$)|$)/;
    const allowedKeysRegex = /\d|,/;

    /*
     * The following condition will check, correspondingly:
     *
     * - If there's already an inserted comma
     * - Validate if pressed key is actually a number
     * - Disallow pressed key if value is already consistent with its format (e.g. 12.345,56)
     * - Don't disallow 'delete' key when pressing it
    */
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
      className={`${appStyles.display} ${!isAmountTypeFrom ? appStyles.displayTo : ''}`}
      onSubmit={e => e.preventDefault()}
    >
      <select defaultValue={DEFAULTS.APP.CURRENCY.ISO} className={appStyles.currency} name='currency'>
        <option value='eur'>EUR</option>
        <option value='gbp'>GBP</option>
        <option value='usd'>USD</option>
      </select>

      <input
        type='text'
        name={`amount-${selectionType}`}
        inputMode='decimal'
        autoFocus={isAmountTypeFrom}
        maxLength={Number.MAX_SAFE_INTEGER.toString().length}
        className={appStyles.amount}
        placeholder='0'
        onChange={handleAmountChange}
        onKeyPress={shouldAllowKeyPress}
        onPaste={e => e.preventDefault()}
        value={maskAmountValue(amountValue, selectionType)}
      />
    </form>

    {/* TODO: Remove it */}
    <p style={{position: 'absolute', bottom: '0', right: '16px'}}> {amountValue.value} </p>

    {children}
  </section>)
}
