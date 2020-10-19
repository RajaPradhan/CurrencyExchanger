import { useReducer } from 'react';
import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { balanceReducer, state as initialState } from '../balanceReducer';
import { BalanceActionType } from '../../types/balanceTypes';

describe('Tests for balanceReducer', () => {
  it('should test the default values of balance state', () => {
    const { result } = renderHook(() =>
      useReducer(balanceReducer, initialState),
    );
    const [state] = result.current;

    expect(state).toEqual({
      data: {
        EUR: 1000,
        GBP: 500,
        USD: 100,
      },
      loading: false,
      error: null,
    });
  });

  it('should test loading state', async () => {
    const { result } = renderHook(() =>
      useReducer(balanceReducer, initialState),
    );
    const [state, dispatch] = result.current;

    act(() => dispatch({ type: BalanceActionType.UPDATE_BALANCE_LOADING }));

    await waitFor(() =>
      expect(result.current[0]).toEqual({
        ...state,
        loading: true,
      }),
    );
  });

  it('should test success state', async () => {
    const { result } = renderHook(() =>
      useReducer(balanceReducer, initialState),
    );
    const [state, dispatch] = result.current;

    act(() =>
      dispatch({
        type: BalanceActionType.UPDATE_BALANCE_SUCCESS,
        payload: {
          EUR: 900,
          GBP: 600,
          USD: 100,
        },
      }),
    );

    await waitFor(() =>
      expect(result.current[0]).toEqual({
        ...state,
        data: { EUR: 900, GBP: 600, USD: 100 },
      }),
    );
  });

  it('should test error state', async () => {
    const { result } = renderHook(() =>
      useReducer(balanceReducer, initialState),
    );
    const [, dispatch] = result.current;

    act(() =>
      dispatch({
        type: BalanceActionType.UPDATE_BALANCE_FAILURE,
      }),
    );

    await waitFor(() =>
      expect(result.current[0].error.message).toEqual(
        'Failed to update balance',
      ),
    );
  });
});
