import React, {
  FunctionComponent,
  KeyboardEvent,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CurrencySelectionType, setAmountValue } from '../../store/amounts/amounts.slices';
import { getBalanceExceeded } from '../../store/balances/balances.selectors';
import { getCurrentRate } from '../../store/exchange/rates/rates.selectors';
import { getExchangeIsoActiveFrom,getExchangeIsoActiveTo } from '../../store/exchange/exchange.selectors';
import { getFromAmountValue, getMinimumAmountToExchange, getToAmountValue } from '../../store/amounts/amounts.selectors';
import { maskAmountValue, removeMaskFromInputValue } from '../../commons/utils/format-amount/format-amount';
import DEFAULTS from '../../app/defaults';
import hasCharInValuePosition from '../../commons/utils/has-char-in-value-position/has-char-in-value-position';
import styles from './CurrencySelection.module.scss';

// This is rendering every time since we have a mask here
// which is updating its default value as reference;
export const AmountInput: FunctionComponent<{type: CurrencySelectionType}> = ({ type }): ReactElement => {
  const dispatch = useDispatch();
  const amountInput = useRef<HTMLInputElement>(null);

  const isAmountTypeFrom = useMemo(() => type === 'from', [type]);
  const currencyBase = useSelector(getExchangeIsoActiveFrom);
  const currencyTo = useSelector(getExchangeIsoActiveTo);
  const currentAmount = useSelector(isAmountTypeFrom ? getFromAmountValue : getToAmountValue);
  const hasBalanceExceeded = useSelector(getBalanceExceeded);
  const hasMinimumAmount = useSelector(getMinimumAmountToExchange);
  const currentRate = useSelector(getCurrentRate);

  // This will make a auto focus in case one of the currencies selection change
  useEffect(() => amountInput.current?.focus(), [currencyBase, currencyTo]);

  const handleAmountChange = useCallback((event: SyntheticEvent<HTMLInputElement>): void => {
    const inputValue = event.currentTarget.value;
    const rawValue = parseFloat(removeMaskFromInputValue(inputValue));
    const value = !Number.isNaN(rawValue) ? rawValue : null;

    const hasDecimalsStarted = hasCharInValuePosition(inputValue, ',', 1);
    const hasZeroAfterComma = hasCharInValuePosition(inputValue, ',', 2) && hasCharInValuePosition(inputValue, '0', 1);

    dispatch(setAmountValue[type]({
      amount: {
        hasDecimalsStarted,
        hasZeroAfterComma,
        value,
      },
      currentRate,
    }));
  }, [currentRate, dispatch, type]);

  const shouldAllowKeyPress = useCallback((
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
  }, []);

  return (
    <>
      <input
        type='text'
        ref={isAmountTypeFrom ? amountInput : null}
        inputMode='decimal'
        autoFocus={isAmountTypeFrom}
        maxLength={Number.MAX_SAFE_INTEGER.toString().length}
        className={`${styles.amount} ${isAmountTypeFrom && (hasBalanceExceeded || !hasMinimumAmount) ? styles.amount__balanceExceeded : ''}`}
        placeholder='0'
        onChange={handleAmountChange}
        onKeyPress={shouldAllowKeyPress}
        onPaste={e => e.preventDefault()}
        value={maskAmountValue(currentAmount, type)}
      />
    </>
  );
}
