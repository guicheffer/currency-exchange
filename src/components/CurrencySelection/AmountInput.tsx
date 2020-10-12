import React, { FunctionComponent, KeyboardEvent, ReactElement, SyntheticEvent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CurrencySelectionType, setAmountValue } from '../../app/slices/amounts';
import { maskAmountValue, removeMaskFromInputValue } from '../../commons/utils/format-amount';
import { RootState } from '../../app/store';
import DEFAULTS from '../../app/defaults/defaults';
import styles from './CurrencySelection.module.scss';

export const AmountInput: FunctionComponent<{type: CurrencySelectionType}> = ({ ...props }): ReactElement => {
  const dispatch = useDispatch();
  const selectionType = props.type;
  const isAmountTypeFrom = useMemo(() => selectionType === 'from', [selectionType]);
  const amountValue = useSelector((state: RootState) => state.amounts[props.type].amount);

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
     * The following condition will check, respectively:
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

  return (
    <input
      type='text'
      inputMode='decimal'
      autoFocus={isAmountTypeFrom}
      maxLength={Number.MAX_SAFE_INTEGER.toString().length}
      className={styles.amount}
      placeholder='0'
      onChange={handleAmountChange}
      onKeyPress={shouldAllowKeyPress}
      onPaste={e => e.preventDefault()}
      value={maskAmountValue(amountValue, selectionType)}
    />
  );
}
