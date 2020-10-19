import { createMuiTheme, Theme } from '@material-ui/core';

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

export const mockLiveRateData = {
  rates: { USD: 1.1741, GBP: 0.90915 },
  base: 'EUR',
  date: '2020-10-16',
};
