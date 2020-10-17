import React, { ReactNode } from 'react';

import { LiveRateProvider } from './LiveRateProvider';

type Props = {
  children: ReactNode;
};

const ExchangeProvider = ({ children }: Props) => {
  return <LiveRateProvider>{children}</LiveRateProvider>;
};

export { ExchangeProvider };
