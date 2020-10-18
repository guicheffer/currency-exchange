import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import { setPollingComplete } from '../../../store/polling/polling.slices';
import { store } from '../../../store/store';
import { updateForexRates } from '../../../store/exchange/rates/rates.slices';
import CurrencyExchangeApp from '../../MainApp/MainApp';
import storeMocks from '../../../store/__mocks__/store.mocks';

const state = store.getState();

const getTestComponent = () => (
  <Provider store={store}>
    <CurrencyExchangeApp />
  </Provider>
);

describe('CurrencyExchangeApp', () => {
  it('contains 2 pockets for each currency (from and to)', () => {
    const { getAllByTestId } = render(getTestComponent());

    expect(getAllByTestId('currency-gbp').length).toBe(2);
    expect(getAllByTestId('currency-eur').length).toBe(2);
    expect(getAllByTestId('currency-btc').length).toBe(2);
    expect(getAllByTestId('currency-usd').length).toBe(2);
  });

  it('can convert "amountFrom" correctly as per selections', async () => {
    const { getByTestId } = render(getTestComponent());

    const amountFromEl = getByTestId('amount-from-el') as HTMLInputElement;
    expect(amountFromEl).toBeTruthy();

    const amountToEl = getByTestId('amount-to-el') as HTMLInputElement;
    expect(amountToEl).toBeTruthy();

    const inputAmountInGbp = '1';
    const expectedAmountInEur = 3;

    store.dispatch(updateForexRates({ ...state.rates.forex, eur: storeMocks.rates.forex.eur }))
    await userEvent.type(amountFromEl, inputAmountInGbp);

    expect(amountFromEl?.value).toBe('- 1');
    expect(amountToEl?.value).toBe(`+ ${expectedAmountInEur}`);
  });

  it('gives user useful messages around such as "minimum required" and "balance exceeding"', async () => {
    const { getByTestId } = render(getTestComponent());

    const amountFromEl = getByTestId('amount-from-el') as HTMLInputElement;

    store.dispatch(updateForexRates({ ...state.rates.forex, eur: storeMocks.rates.forex.eur }))

    const hasMinimumRequiredMessage = () => getByTestId('minimum-required');
    const hasBalanceExceeded = () => getByTestId('balance-exceeds');

    userEvent.clear(amountFromEl);
    await userEvent.type(amountFromEl, '0,15');

    expect(hasMinimumRequiredMessage()).toBeTruthy(); // minimum is 2
    expect(() => hasBalanceExceeded()).toThrow();

    userEvent.clear(amountFromEl);
    await userEvent.type(amountFromEl, '10');
    expect(() => hasMinimumRequiredMessage()).toThrow();
    userEvent.clear(amountFromEl);

    await userEvent.type(amountFromEl, '20');
    expect(hasBalanceExceeded()).toBeTruthy();
  });

  it('can exchange "amountTo" into new balance', async () => {
    const { getByTestId } = render(getTestComponent());

    window.confirm = jest.fn().mockImplementation(() => true);

    const amountFromEl = getByTestId('amount-from-el') as HTMLInputElement;
    const balanceTo = getByTestId('balance-to') as HTMLInputElement;
    expect(balanceTo?.textContent).toContain('25,000');

    store.dispatch(updateForexRates({ ...state.rates.forex, eur: storeMocks.rates.forex.eur }))
    store.dispatch(setPollingComplete());

    const exchangeActionEl = getByTestId('exchange-action') as HTMLButtonElement;

    userEvent.clear(amountFromEl);
    await userEvent.type(amountFromEl, '1');
    expect(exchangeActionEl?.disabled).toBeTruthy();
    userEvent.clear(amountFromEl);

    await userEvent.type(amountFromEl, '20');
    expect(exchangeActionEl?.disabled).toBeTruthy();
    userEvent.clear(amountFromEl);

    await userEvent.type(amountFromEl, '10');
    expect(exchangeActionEl?.disabled).toBeFalsy();

    userEvent.click(exchangeActionEl);
    expect(balanceTo?.textContent).toContain(`25,030`); // 25,000 + 30
  });

  it('validates "amountFrom" with two digits after the comma', async () => {
    const { getByTestId } = render(getTestComponent());

    const amountFromEl = getByTestId('amount-from-el') as HTMLInputElement;
    expect(amountFromEl).toBeTruthy();

    const amountToEl = getByTestId('amount-to-el') as HTMLInputElement;
    expect(amountToEl).toBeTruthy();

    store.dispatch(updateForexRates({ ...state.rates.forex, eur: storeMocks.rates.forex.eur }))
    await userEvent.type(amountFromEl, '1,237492374');

    expect(amountFromEl?.value).toBe('- 1,23');
  });
});
