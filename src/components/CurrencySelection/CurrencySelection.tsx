import React, { ChangeEvent, FunctionComponent, KeyboardEvent, useMemo } from 'react';

import DEFAULTS from '../../app/defaults';

import appStyles from '../../commons/styles/app.module.scss';
import formatAmount from '../../commons/utils/format-amount';

type CurrencySelectionProps = {
  type: 'from' | 'to';
}

const handleAmountChange = (
  event: ChangeEvent<HTMLInputElement>,
  type: CurrencySelectionProps['type'],
): void => {
  const rawValue = event.currentTarget.value as string;
  const value = rawValue.trim().replace(/\./g, '').replace(/,/, '.').replace(/[+|-]/g, '');
  const hasDecimalsStarted = value[value.length - 1] === '.';
  const amount = parseFloat(value) as number;

  if (Number.isNaN(amount)) {
    event.currentTarget.value = '';
    return;
  }

  const formattedAmount = formatAmount(amount);
  const prefix = value ? `${DEFAULTS.APP.AMOUNT.SYMBOLS[type]} ` : '';
  const suffix = hasDecimalsStarted ? ',' : '';
  event.currentTarget.value = `${prefix}${formattedAmount}${suffix}`;
}

const handleAmountKeyPress = (
  event: KeyboardEvent<HTMLInputElement>,
): void => {
  const pressedKeyString = String.fromCharCode(event.which);
  const allowedKeysRegex = /[0-9]|,/;

  const amountValue = event.currentTarget.value;
  const allowedValueRegex = /^[\d|.| |+|-]+?(?=(,\d{0,1}$)|$)/;

  if (
    (amountValue === '' && pressedKeyString === ',') ||
    !allowedKeysRegex.test(pressedKeyString) ||

    (amountValue &&
    !allowedValueRegex.test(amountValue) &&
    event.keyCode !== DEFAULTS.KEYCODES.DELETE)
  ) return event.preventDefault();
}

export const CurrencySelection: FunctionComponent<CurrencySelectionProps> = ({ children, ...props }) => {
  const isAmountFrom = useMemo(() => props.type === 'from', [props.type]);

  return (<section className={`${appStyles.row} currency-exchange-section currency-exchange-section--${props.type}`}>
    <form
      autoComplete='off'
      className={`${appStyles.display} ${!isAmountFrom ? appStyles.displayTo : ''}`}
      onSubmit={e => e.preventDefault()}
    >
      <select defaultValue='eur' className={appStyles.currency} name='currency'>
        <option value='eur'>EUR</option>
        <option value='gbp'>GBP</option>
        <option value='usd'>USD</option>
      </select>

      <input
        type='text'
        inputMode='decimal'
        autoFocus={isAmountFrom}
        maxLength={Number.MAX_SAFE_INTEGER.toString().length}
        className={appStyles.amount}
        name='amount'
        placeholder='0'
        onPaste={(e) => e.preventDefault()}
        onChange={(e) => handleAmountChange(e, props.type)}
        onKeyPress={handleAmountKeyPress}
      />
    </form>
  </section>)
}
