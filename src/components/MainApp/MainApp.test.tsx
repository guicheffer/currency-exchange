import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import React from 'react';

import { store } from '../../store/store';
import CurrencyExchangeApp from './MainApp';

describe('MainApp', () => {
  it('renders main currency app container', () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <CurrencyExchangeApp />
      </Provider>
    );

    expect(getByTestId('main-app')).toBeTruthy();
    expect(getByText(/exchange/i)).toBeInTheDocument();
  });
});
