import React from 'react';
import { useSelector } from 'react-redux';

import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import { getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../../store/exchange/exchange.selectors';
import { setCurrencyActiveFrom } from '../../store/exchange/exchange.slices';

export function CurrencyFrom() {
  const activeCurrency = useSelector(getExchangeIsoActiveFrom);
  const convertCurrency = useSelector(getExchangeIsoActiveTo);

  return (
    <CurrencySelection
      type='from'
      activeCurrency={activeCurrency}
      convertCurrency={convertCurrency}
      changeActiveCurrency={setCurrencyActiveFrom}
    />
  );
}
