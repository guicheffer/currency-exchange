import React from 'react';
import { useSelector } from 'react-redux';

import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../store/exchange/exchange.selectors';
import { setActiveFrom } from '../../store/exchange/exchange.slices';

export function CurrencyFrom() {
  const currencyOrigin = useSelector(getExchangeIsoActiveFrom);
  const currencyConvert = useSelector(getExchangeIsoActiveTo);

  return (
    <CurrencySelection
      type='from'
      currencyOrigin={currencyOrigin}
      currencyConvert={currencyConvert}
      setActive={setActiveFrom}
    />
  );
}
