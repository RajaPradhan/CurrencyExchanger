import React from 'react';

import {
  useLiveRateContext,
  useLiveRateDispatch,
  fetchLiveRate,
} from '../LiveRateProvider';

const LiveRateConsumer = () => {
  const liveRateContext = useLiveRateContext();
  const liveRateDispatch = useLiveRateDispatch();

  const handleClick = () => {
    fetchLiveRate(liveRateDispatch);
  };

  return (
    <>
      <div data-testid="rate-gbp">
        {liveRateContext.data ? liveRateContext.data.GBP : ''}
      </div>
      <div data-testid="rate-usd">
        {liveRateContext.data ? liveRateContext.data.USD : ''}
      </div>
      <button onClick={handleClick}>Fetch live rate</button>
    </>
  );
};

export default LiveRateConsumer;
