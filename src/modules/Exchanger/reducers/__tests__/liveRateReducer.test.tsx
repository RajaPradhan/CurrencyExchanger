import { useReducer } from 'react';
import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { liveRateReducer, state as initialState } from '../liveRateReducer';
import { LiveRateActionType } from '../../types/liveRateTypes';

describe('Tests for liveRateReducer', () => {
  it('should test the default values of liveRate state', () => {
    const { result } = renderHook(() =>
      useReducer(liveRateReducer, initialState),
    );
    const [state] = result.current;

    expect(state).toEqual({
      data: null,
      loading: false,
      error: null,
    });
  });

  it('should test loading state', async () => {
    const { result } = renderHook(() =>
      useReducer(liveRateReducer, initialState),
    );
    const [state, dispatch] = result.current;

    act(() => dispatch({ type: LiveRateActionType.FETCH_LIVE_RATE_LOADING }));

    await waitFor(() =>
      expect(result.current[0]).toEqual({
        ...state,
        loading: true,
      }),
    );
  });

  it('should test success state', async () => {
    const { result } = renderHook(() =>
      useReducer(liveRateReducer, initialState),
    );
    const [state, dispatch] = result.current;

    act(() =>
      dispatch({
        type: LiveRateActionType.FETCH_LIVE_RATE_SUCCESS,
        payload: {
          EUR: 1,
          USD: 1.1741,
          GBP: 0.90915,
        },
      }),
    );

    await waitFor(() =>
      expect(result.current[0]).toEqual({
        ...state,
        data: {
          EUR: 1,
          USD: 1.1741,
          GBP: 0.90915,
        },
      }),
    );
  });

  it('should test error state', async () => {
    const { result } = renderHook(() =>
      useReducer(liveRateReducer, initialState),
    );
    const [, dispatch] = result.current;

    act(() =>
      dispatch({
        type: LiveRateActionType.FETCH_LIVE_RATE_FAILURE,
      }),
    );

    await waitFor(() =>
      expect(result.current[0].error.message).toEqual(
        'Failed to fetch live rates',
      ),
    );
  });
});
