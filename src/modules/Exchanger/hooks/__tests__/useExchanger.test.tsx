import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import {
  mockBalanceData,
  mockLiveRateState,
  mockSource,
  mockDestination,
} from 'shared/utils/mockData';
import { Currency } from 'shared/types';
import useExchanger from '../useExchanger';

const balanceContext = { data: mockBalanceData };
const liveRateContext = { data: mockLiveRateState };
const balanceDispatch = () => {};
let updateBalance = () => {};
const enqueueSnackbar = () => {};

describe('Tests for useExchanger hook', () => {
  beforeEach(() => {});
  it('should set the correct balance when a currency is selected', async () => {
    const { result } = renderHook(() =>
      useExchanger({
        balanceContext,
        liveRateContext,
        balanceDispatch,
        updateBalance,
        enqueueSnackbar,
      }),
    );

    const { handleCurrencyChange } = result.current;

    act(() => handleCurrencyChange('source', Currency.GBP));
    const source = result.current.source ? result.current.source : mockSource;

    await waitFor(() => expect(source.currency).toBe(Currency.GBP));

    await waitFor(() => expect(source.balance).toBe(1000));
  });

  it('should set the correct amount for source and destination when source amount is changed', async () => {
    const { result } = renderHook(() =>
      useExchanger({
        balanceContext,
        liveRateContext,
        balanceDispatch,
        updateBalance,
        enqueueSnackbar,
      }),
    );

    const { handleAmountChange } = result.current;

    act(() => handleAmountChange('source', 10));
    const source = result.current.source ? result.current.source : mockSource;
    const destination = result.current.destination
      ? result.current.destination
      : mockDestination;

    await waitFor(() => expect(source.amount).toBe(10));
    await waitFor(() => expect(destination.amount).toBe(9.1));
  });

  it('should switch source and destination', async () => {
    const { result } = renderHook(() =>
      useExchanger({
        balanceContext,
        liveRateContext,
        balanceDispatch,
        updateBalance,
        enqueueSnackbar,
      }),
    );

    const { handleCurrencySwitch, setSource, setDestination } = result.current;

    act(() =>
      setSource({
        currency: Currency.EUR,
        balance: 1000,
        amount: 10,
      }),
    );
    act(() =>
      setDestination({
        currency: Currency.GBP,
        balance: 500,
        amount: 9.1,
      }),
    );

    let source = result.current.source ? result.current.source : mockSource;
    let destination = result.current.destination
      ? result.current.destination
      : mockDestination;

    await waitFor(() => expect(source.currency).toBe(Currency.EUR));
    await waitFor(() => expect(source.amount).toBe(10));
    await waitFor(() => expect(source.balance).toBe(1000));
    await waitFor(() => expect(destination.currency).toBe(Currency.GBP));
    await waitFor(() => expect(destination.amount).toBe(9.1));
    await waitFor(() => expect(destination.balance).toBe(500));

    act(() => handleCurrencySwitch());

    source = result.current.source ? result.current.source : mockSource;
    destination = result.current.destination
      ? result.current.destination
      : mockDestination;

    await waitFor(() => expect(source.currency).toBe(Currency.GBP));
    await waitFor(() => expect(source.balance).toBe(500));
    await waitFor(() => expect(destination.currency).toBe(Currency.EUR));
    await waitFor(() => expect(destination.balance).toBe(1000));
  });

  it('should verify source and destination data after successful exchange', async () => {
    updateBalance = jest.fn();

    const { result } = renderHook(() =>
      useExchanger({
        balanceContext,
        liveRateContext,
        balanceDispatch,
        updateBalance,
        enqueueSnackbar,
      }),
    );

    const { handleExchange, setSource, setDestination } = result.current;

    act(() =>
      setSource({
        currency: Currency.EUR,
        balance: 1000,
        amount: 10,
      }),
    );
    act(() =>
      setDestination({
        currency: Currency.GBP,
        balance: 500,
        amount: 9.1,
      }),
    );

    act(() => handleExchange());

    let source = result.current.source ? result.current.source : mockSource;
    let destination = result.current.destination
      ? result.current.destination
      : mockDestination;

    await waitFor(() => expect(updateBalance).toHaveBeenCalled());
    await waitFor(() => expect(source.currency).toBe(Currency.EUR));
    await waitFor(() => expect(source.amount).toBe(0));
    await waitFor(() => expect(destination.currency).toBe(Currency.GBP));
    await waitFor(() => expect(destination.amount).toBe(0));
  });
});
