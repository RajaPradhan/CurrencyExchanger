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
      <div data-testId="rate-gbp">
        {liveRateContext.data ? liveRateContext.data.GBP : ''}
      </div>
      <div data-testId="rate-usd">
        {liveRateContext.data ? liveRateContext.data.USD : ''}
      </div>
      <button onClick={handleClick}>Fetch live rate</button>
    </>
  );
};

export default LiveRateConsumer;
