import configureStore from 'redux-mock-store'

import { getBalanceExceeded, getCurrencyBalance } from '../balances.selectors';
import { RootState } from '../../store';
import initialStateMock from '../../__mocks__/store.mocks';

const mockStore = configureStore();
const mockedStore = mockStore(initialStateMock);
const mockedState = mockedStore.getState() as RootState;

describe('getBalanceExceeded', () => {
  it('should return false for when it\'s not and true when it\'s', () => {
    expect(getBalanceExceeded(mockedState)).toBeFalsy();

    const newMockedState = {
      ...mockedState,
      amounts: {
        from: {
          value: 20,
        },
        to: {
          value: null,
        }
      },
    };

    expect(getBalanceExceeded(newMockedState)).toBeTruthy();
  });
});

describe('getCurrencyBalance', () => {
  it('it works as expected', () => {
    expect(getCurrencyBalance(mockedState, 'gbp')).toEqual(15);
  });
});
