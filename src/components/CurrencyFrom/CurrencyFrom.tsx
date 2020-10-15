import React from 'react';
import { useSelector } from 'react-redux';

import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../store/exchange/exchange.selectors';
import { setCurrencyActiveFrom } from '../../store/exchange/exchange.slices';

export function CurrencyFrom() {
  const currencyBase = useSelector(getExchangeIsoActiveFrom);
  const currencyTo = useSelector(getExchangeIsoActiveTo);

  return (
    <CurrencySelection
      type='from'
      currencyBase={currencyBase}
      currencyTo={currencyTo}
      setLocalCurrency={setCurrencyActiveFrom}
    />
  );
}
