import React, {
  FunctionComponent,
  KeyboardEvent,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AmountValueState, CurrencySelectionType, setAmountValue } from '../../store/amounts/amounts.slices';
import { getBalanceExceeded } from '../../store/balances/balances.selectors';
import { getConvertedRate } from '../../store/exchange/rates/rates.selectors';
import { getExchangeIsoActiveFrom,getExchangeIsoActiveTo } from '../../store/exchange/exchange.selectors';
import { getFromAmountValue, getToAmountValue } from '../../store/amounts/amounts.selectors';
import { maskAmountValue, removeMaskFromInputValue } from '../../commons/utils/format-amount/format-amount';
import { RootState } from '../../store/store';
import DEFAULTS from '../../app/defaults';
import hasCharInValuePosition from '../../commons/utils/has-char-in-value-position/has-char-in-value-position';
import styles from './CurrencySelection.module.scss';

const makeGetConvertedRate = () => getConvertedRate;

// This is rendering every time since we have a mask here
// which is updating its default value as reference;
export const AmountInput: FunctionComponent<{type: CurrencySelectionType}> = ({ type }): ReactElement => {
  const dispatch = useDispatch();
  const isAmountTypeFrom = useMemo(() => type === 'from', [type]);
  const inputAmount = useSelector(isAmountTypeFrom ? getFromAmountValue : getToAmountValue);
  const amountInput = useRef<HTMLInputElement>(null);
  const activeFrom = useSelector(getExchangeIsoActiveFrom);
  const activeTo = useSelector(getExchangeIsoActiveTo);
  const hasBalanceExceeded = useSelector(getBalanceExceeded);

  const selectConvertedRate = useMemo(makeGetConvertedRate, []);
  const convertedRate = useSelector((state: RootState) => selectConvertedRate(state, type));

  // TODO: Think about a nice solution to control converted rate stateless 👇🏼
  const [isInteracting, setIsInteracting] = useState(false);
  const currentAmount: AmountValueState = isInteracting ? inputAmount : convertedRate.value ? convertedRate : inputAmount;

  // This will make a auto focus in case one of the currencies selection change
  useEffect(() => amountInput.current?.focus(), [activeFrom, activeTo]);

  // This will control user's interaction in order to trigger (or not) the conversion rate
  const handleBlur = useCallback(() => setIsInteracting(false), []);
  const handleFocus = useCallback(() => {
    if (convertedRate?.value) dispatch(setAmountValue[type](convertedRate));
    setIsInteracting(true);
  }, [dispatch, type, convertedRate]);

  const handleAmountChange = useCallback((event: SyntheticEvent<HTMLInputElement>): void => {
    const inputValue = event.currentTarget.value;
    const rawValue = parseFloat(removeMaskFromInputValue(inputValue));
    const value = !Number.isNaN(rawValue) ? rawValue : null;

    const hasDecimalsStarted = hasCharInValuePosition(inputValue, ',', 1);
    const hasZeroAfterComma = hasCharInValuePosition(inputValue, ',', 2) && hasCharInValuePosition(inputValue, '0', 1);

    dispatch(setAmountValue[type]({
      hasDecimalsStarted,
      hasZeroAfterComma,
      value,
    }));
  }, [dispatch, type]);

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
        className={`${styles.amount} ${isAmountTypeFrom && !!hasBalanceExceeded ? styles.amount__balanceExceeded : ''}`}
        placeholder='0'
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleAmountChange}
        onKeyPress={shouldAllowKeyPress}
        onPaste={e => e.preventDefault()}
        value={maskAmountValue(currentAmount, type)}
      />
    </>
  );
}
