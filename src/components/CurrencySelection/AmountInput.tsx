import React, {
  FunctionComponent,
  KeyboardEvent,
  ReactElement,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CurrencySelectionType, setAmountValue } from '../../app/slices/amounts';
import { getExchangeIsoActiveFrom,getExchangeIsoActiveTo } from '../../app/selectors/exchange';
import { getFromAmountValue, getToAmountValue } from '../../app/selectors/amounts';
import { maskAmountValue, removeMaskFromInputValue } from '../../commons/utils/format-amount';
import DEFAULTS from '../../app/defaults/defaults';
import styles from './CurrencySelection.module.scss';

export const AmountInput: FunctionComponent<{type: CurrencySelectionType}> = ({ ...props }): ReactElement => {
  const dispatch = useDispatch();
  const selectionType = props.type;
  const isAmountTypeFrom = useMemo(() => selectionType === 'from', [selectionType]);
  const currentAmount = useSelector(isAmountTypeFrom ? getFromAmountValue : getToAmountValue);
  const amountInput = useRef<HTMLInputElement>(null);
  const activeFrom = useSelector(getExchangeIsoActiveFrom);
  const activeTo = useSelector(getExchangeIsoActiveTo);

  useEffect(() => amountInput.current?.focus(), [activeFrom, activeTo]);

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
     * The following conditions will, respectively:
     *
     * - check if there's already an inserted comma or;
     * - check if pressed key is actually a number or:
     *
     * - check if there's a proper amount value and;
     * - disallow pressed key if value is already consistent with its format (e.g. 12.345,56) and;
     * - not disallow users from 'delete' key actions and;
     * - check has not selecteded something in the field to get it replaced.
    */
    if (
      (amountValue === '' && pressedKeyString === ',') ||
      !allowedKeysRegex.test(pressedKeyString) ||

      (amountValue &&
      !permittedValueRegex.test(amountValue) &&
      event.keyCode !== DEFAULTS.KEYCODES.DELETE &&
      !((event.currentTarget.selectionEnd as number) > (event.currentTarget.selectionStart as number)))
    ) return event.preventDefault();
  }

  return (
    <input
      type='text'
      ref={isAmountTypeFrom ? amountInput : null}
      inputMode='decimal'
      autoFocus={isAmountTypeFrom}
      maxLength={Number.MAX_SAFE_INTEGER.toString().length}
      className={styles.amount}
      placeholder='0'
      onChange={handleAmountChange}
      onKeyPress={shouldAllowKeyPress}
      onPaste={e => e.preventDefault()}
      value={maskAmountValue(currentAmount, selectionType)}
    />
  );
}
