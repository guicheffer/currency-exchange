import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import React from 'react';

import { store } from '../../app/store';
import CurrencyExchangeApp from './MainApp';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <CurrencyExchangeApp />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
