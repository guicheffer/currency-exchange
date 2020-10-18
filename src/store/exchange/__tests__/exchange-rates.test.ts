import configureStore from 'redux-mock-store'

import { getActiveSelectionType, getExchangeIsoActiveFrom, getExchangeIsoActiveTo } from '../exchange.selectors';
import { getCurrentRate } from '../rates/rates.selectors';
import { RootState } from '../../store';
import initialStateMock from '../../__mocks__/store.mocks';

const mockStore = configureStore();
const mockedStore = mockStore(initialStateMock);
const mockedState = mockedStore.getState() as RootState;

describe('getActiveSelectionType', () => {
  it('it works as expected', () => {
    expect(getActiveSelectionType(mockedState)).toEqual('from');
  });
});

describe('getExchangeIsoActiveFrom', () => {
  it('it works as expected and it should be lower case', () => {
    expect(getExchangeIsoActiveFrom(mockedState)).toEqual('gbp');
  });
});

describe('getExchangeIsoActiveTo', () => {
  it('it works as expected and it should be lower case', () => {
    expect(getExchangeIsoActiveTo(mockedState)).toEqual('eur');
  });
});

describe('getCurrentRate', () => {
  it('it works as expected', () => {
    expect(getCurrentRate(mockedState)).toEqual(3); // same as in the integration tests
  });
});
