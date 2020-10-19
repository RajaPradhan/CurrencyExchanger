import React, { useReducer, createContext, ReactNode, useContext } from 'react';

import {
  LiveRateState,
  LiveRateDispatch,
  LiveRateActionType,
} from '../types/liveRateTypes';

import {
  liveRateReducer,
  state as liveRateInitialState,
} from '../reducers/liveRateReducer';

type Props = {
  children: ReactNode;
};

export const API_ENDPOINT: string = 'https://api.exchangeratesapi.io';

const LiveRateStateContext = createContext<LiveRateState | undefined>(
  undefined,
);
const LiveRateDispatchContext = createContext<LiveRateDispatch | undefined>(
  undefined,
);

const LiveRateProvider = ({ children }: Props) => {
  const [liveRateState, liveRateDispatch] = useReducer(
    liveRateReducer,
    liveRateInitialState,
  );

  return (
    <LiveRateStateContext.Provider value={liveRateState}>
      <LiveRateDispatchContext.Provider value={liveRateDispatch}>
        {children}
      </LiveRateDispatchContext.Provider>
    </LiveRateStateContext.Provider>
  );
};

const useLiveRateContext = () => {
  const context = useContext(LiveRateStateContext);
  if (context === undefined) {
    throw new Error(
      'useLiveRateContext must be used within a LiveRateProvider',
    );
  }
  return context;
};

const useLiveRateDispatch = () => {
  const context = useContext(LiveRateDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useLiveRateDispatch must be used within a LiveRateProvider',
    );
  }
  return context;
};

const fetchLiveRate = async (dispatch: LiveRateDispatch) => {
  dispatch({ type: LiveRateActionType.FETCH_LIVE_RATE_LOADING });
  try {
    const liveRate = await fetch(`${API_ENDPOINT}/latest?symbols=USD,GBP`);
    const jsonData = await liveRate.json();
    const payload = { EUR: 1, ...jsonData.rates };

    dispatch({
      type: LiveRateActionType.FETCH_LIVE_RATE_SUCCESS,
      payload,
    });
  } catch (error) {
    dispatch({ type: LiveRateActionType.FETCH_LIVE_RATE_FAILURE });
  }
};

export {
  LiveRateProvider,
  useLiveRateContext,
  useLiveRateDispatch,
  fetchLiveRate,
};
