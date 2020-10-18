import React, { useReducer, createContext, ReactNode, useContext } from 'react';

import {
  BalanceState,
  BalanceDispatch,
  BalanceActionType,
} from '../types/balanceTypes';
import { ExchangeItemType } from '../../../shared/components/ExchangeItem/types';
import {
  balanceReducer,
  state as balanceInitialState,
} from '../reducers/balanceReducer';

type Props = {
  children: ReactNode;
};

const BalanceStateContext = createContext<BalanceState | undefined>(undefined);
const BalanceDispatchContext = createContext<BalanceDispatch | undefined>(
  undefined,
);

const BalanceProvider = ({ children }: Props) => {
  const [balanceState, balanceDispatch] = useReducer(
    balanceReducer,
    balanceInitialState,
  );

  return (
    <BalanceStateContext.Provider value={balanceState}>
      <BalanceDispatchContext.Provider value={balanceDispatch}>
        {children}
      </BalanceDispatchContext.Provider>
    </BalanceStateContext.Provider>
  );
};

const useBalanceContext = () => {
  const context = useContext(BalanceStateContext);
  if (context === undefined) {
    throw new Error('useBalanceContext must be used within a BalanceProvider');
  }
  return context;
};

const useBalanceDispatch = () => {
  const context = useContext(BalanceDispatchContext);
  if (context === undefined) {
    throw new Error('useBalanceDispatch must be used within a BalanceProvider');
  }
  return context;
};

const updateBalance = (
  context: BalanceState,
  dispatch: BalanceDispatch,
  source: ExchangeItemType,
  destination: ExchangeItemType,
  liveRate: number,
) => {
  dispatch({ type: BalanceActionType.UPDATE_BALANCE_LOADING });
  try {
    const balanceData = context.data;
    balanceData[source.currency] -= source.amount; // subtract from source pocket
    balanceData[destination.currency] += source.amount * liveRate; // add to destination pocket
    dispatch({
      type: BalanceActionType.UPDATE_BALANCE_SUCCESS,
      payload: balanceData,
    });
  } catch (error) {
    dispatch({ type: BalanceActionType.UPDATE_BALANCE_FAILURE });
  }
};

export {
  BalanceProvider,
  useBalanceContext,
  useBalanceDispatch,
  updateBalance,
};
