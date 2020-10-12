// import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
// import React, { useState } from 'react';


// import {
  //   decrement,
  //   increment,
  //   incrementByAmount,
  //   incrementAsync,
  //   selectCount,
  // } from './counterSlice';

import { CurrencySelection } from '../CurrencySelection/CurrencySelection';
import appStyles from '../../commons/styles/app.module.scss';

export function CurrencyTo() {
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <CurrencySelection type='to'>
      <button
        disabled
        className={appStyles.exchange}
        type="submit"
      > Exchange </button>
    </CurrencySelection>
  );
}
