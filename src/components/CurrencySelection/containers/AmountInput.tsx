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

import { CurrencySelectionType, defaultAmountState, setAmountValue } from '../../../store/amounts/amounts.slices';
import { getAmountFrom, getMinimumAmountToExchange, getAmountTo } from '../../../store/amounts/amounts.selectors';
import { getBalanceExceeded } from '../../../store/balances/balances.selectors';
import { setActiveExchange } from '../../../store/exchange/exchange.slices';
import { getActiveSelectionType, getExchangeIsoActiveFrom,getExchangeIsoActiveTo } from '../../../store/exchange/exchange.selectors';
import { maskAmountValue, removeMaskFromInputValue } from '../../../commons/utils/format-amount/format-amount';
import CONFIGS from '../../../app/configs';
import hasCharInValuePosition from '../../../commons/utils/has-char-in-value-position/has-char-in-value-position';
import styles from '../CurrencySelection.module.scss';

type AmountInputProps = {
  type: CurrencySelectionType;
}

// This is rendering every time since we have a mask feature which is updating its default value as reference
export const AmountInput: FunctionComponent<AmountInputProps> = ({ type }): ReactElement => {
  const dispatch = useDispatch();

  const isSelectionTypeFrom = useMemo(() => type === 'from', [type]);
  const activeSelectionType = useSelector(getActiveSelectionType);
  const oppositeSelectionType = isSelectionTypeFrom ? 'to' : 'from';

  const currencyBase = useSelector(getExchangeIsoActiveFrom);
  const currencyTo = useSelector(getExchangeIsoActiveTo);
  const currentAmount = useSelector(isSelectionTypeFrom ? getAmountFrom : getAmountTo);

  const hasBalanceExceededValue = useSelector(getBalanceExceeded);
  const hasMinimumAmountValue = useSelector(getMinimumAmountToExchange);

  // This will make a auto focus in case one of the currencies selection change
  const amountFromInput = useRef<HTMLInputElement>(null);
  useEffect(() => amountFromInput.current?.focus(), [currencyBase, currencyTo]);

  const handleFocus = useCallback((): void => {
    dispatch(setActiveExchange(type));
    dispatch(setAmountValue[type](currentAmount));
    dispatch(setAmountValue[oppositeSelectionType](defaultAmountState));
  }, [currentAmount, dispatch, oppositeSelectionType, type]);

  const handleAmountChange = useCallback((event: SyntheticEvent<HTMLInputElement>): void => {
    const inputValue = event.currentTarget.value;
    const inputValueWithoutMask = removeMaskFromInputValue(inputValue);
    const rawValue = parseFloat(inputValueWithoutMask); // TODO: trailling zero
    const value = !Number.isNaN(rawValue) ? rawValue : null;

    const hasDecimalsStarted = hasCharInValuePosition(inputValue, ',', 1);
    const hasZeroRightAfterComma = hasCharInValuePosition(inputValue, ',', 2) && hasCharInValuePosition(inputValue, '0', 1);

    dispatch(setAmountValue[type]({
      hasDecimalsStarted,
      hasZeroRightAfterComma,
      value,
    }));
  }, [dispatch, type]);

  const handleKeyPress = useCallback((event: KeyboardEvent<HTMLInputElement>): void => {
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
      event.keyCode !== CONFIGS.KEYCODES.DELETE &&
      !((event.currentTarget.selectionEnd as number) > (event.currentTarget.selectionStart as number)))
    ) return event.preventDefault();
  }, []);

  return (
    <>
      <input
        type='text'
        ref={activeSelectionType === type ? amountFromInput : null}
        inputMode='decimal'
        autoFocus={activeSelectionType === type}
        maxLength={Number.MAX_SAFE_INTEGER.toString().length}
        className={`${styles.amount} ${isSelectionTypeFrom && (hasBalanceExceededValue || !hasMinimumAmountValue) ? styles.amount__balanceExceeded : ''}`}
        placeholder='0'
        onFocus={handleFocus}
        onChange={handleAmountChange}
        onKeyPress={handleKeyPress}
        onPaste={e => e.preventDefault()}
        value={maskAmountValue(currentAmount, type)}
      />
    </>
  );
}
