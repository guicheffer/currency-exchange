import React from 'react';
import { useSelector } from 'react-redux';

import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../app/selectors/exchange';
import { setActiveFrom } from '../../app/slices/exchange';

export function CurrencyFrom() {
  const currency = useSelector(getExchangeIsoActiveFrom);
  const currencyTo = useSelector(getExchangeIsoActiveTo);

  return (
    <CurrencySelection
      type='from'
      currency={currency}
      currencyTo={currencyTo}
      setActive={setActiveFrom}
    />
  );
}
