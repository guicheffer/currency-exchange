// import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';

// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   selectCount,
// } from './counterSlice';

import { CurrencySelection } from '../CurrencySelection/CurrencySelection';

export function CurrencyFrom() {
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <CurrencySelection type='from' />
  );
}
