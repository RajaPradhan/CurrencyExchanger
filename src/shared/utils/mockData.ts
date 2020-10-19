import { createMuiTheme, Theme } from '@material-ui/core';

import { ExchangeItemType } from 'shared/components/ExchangeItem/types';
import { Currency } from 'shared/types';
import { LiveRateData } from 'modules/Exchanger/types/liveRateTypes';
import { BalanceState } from 'modules/Exchanger/types/balanceTypes';

export const defaultTheme: Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    h1: {
      fontSize: '1.6rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1.8rem',
      fontWeight: 400,
    },
  },
});

export const mockLiveRateResponse = {
  rates: { USD: 1.1741, GBP: 0.90915 },
  base: 'EUR',
  date: '2020-10-16',
};

export const mockLiveRateState: LiveRateData = {
  EUR: 1,
  GBP: 0.90915,
  USD: 1.1741,
};

export const mockSource: ExchangeItemType = {
  currency: Currency.EUR,
  amount: 10,
  balance: 1000,
};

export const mockDestination: ExchangeItemType = {
  currency: Currency.GBP,
  amount: 9.1,
  balance: 500,
};

export const mockBalanceData = {
  EUR: 1000,
  GBP: 500,
  USD: 100,
};

export const liveRate: number = 0.91;
