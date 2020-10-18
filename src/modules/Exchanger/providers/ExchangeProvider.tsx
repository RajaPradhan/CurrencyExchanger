import React, { ReactNode } from 'react';

import { LiveRateProvider } from './LiveRateProvider';
import { BalanceProvider } from './BalanceProvider';

type Props = {
  children: ReactNode;
};

const ExchangeProvider = ({ children }: Props) => {
  return (
    <LiveRateProvider>
      <BalanceProvider>{children}</BalanceProvider>
    </LiveRateProvider>
  );
};

export { ExchangeProvider };
