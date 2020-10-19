import React from 'react';

import {
  useBalanceContext,
  useBalanceDispatch,
  updateBalance,
} from '../BalanceProvider';
import { mockSource, mockDestination, liveRate } from 'shared/utils/mockData';

const BalanceConsumer = () => {
  const balanceContext = useBalanceContext();
  const balanceDispatch = useBalanceDispatch();

  const handleClick = () =>
    updateBalance(
      balanceContext,
      balanceDispatch,
      mockSource,
      mockDestination,
      liveRate,
      () => {},
    );

  return (
    <>
      <div data-testid="source-balance">{balanceContext.data.EUR}</div>
      <div data-testid="destination-balance">{balanceContext.data.GBP}</div>
      <button onClick={handleClick}>Exchange</button>
    </>
  );
};

export default BalanceConsumer;
