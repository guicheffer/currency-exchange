import configureStore from 'redux-mock-store'

import { getAmountFrom, getAmountTo } from '../amounts.selectors';;
import { RootState } from '../../store';
import initialStateMock from '../../__mocks__/store.mocks';

const mockStore = configureStore();
const mockedStore = mockStore(initialStateMock);
const mockedState = mockedStore.getState() as RootState;

describe('getAmountFrom', () => {
  it('it works as expected', () => {
    expect(getAmountFrom(mockedState)).toEqual({ value: 15 }); // raw "15"
  });
});

describe('getAmountTo', () => {
  it('it works as expected', () => {
    expect(getAmountTo(mockedState)).toEqual({ value: 45 }); // 15 * 3
  });
});
