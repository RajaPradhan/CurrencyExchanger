import React, { ReactNode } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { SnackbarProvider } from 'notistack'; // provides an imperative API to show notification from any place

import { LiveRateProvider } from './LiveRateProvider';
import { BalanceProvider } from './BalanceProvider';

const useStyles = makeStyles(() => ({
  container: {
    '& .MuiCollapse-wrapper': {
      marginTop: '60px',
    },
  },
}));

type Props = {
  children: ReactNode;
};

const ExchangeProvider = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <SnackbarProvider maxSnack={3}>
        <LiveRateProvider>
          <BalanceProvider>{children}</BalanceProvider>
        </LiveRateProvider>
      </SnackbarProvider>
    </Grid>
  );
};

export default ExchangeProvider;
