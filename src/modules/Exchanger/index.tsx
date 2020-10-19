import React, { useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import {
  useLiveRateContext,
  useLiveRateDispatch,
  fetchLiveRate,
} from './providers/LiveRateProvider';
import {
  useBalanceContext,
  useBalanceDispatch,
  updateBalance,
} from './providers/BalanceProvider';
import useExchanger from './hooks/useExchanger';

import ExchangeItem from 'shared/components/ExchangeItem';
import CurrencySwitcher from 'shared/components/CurrencySwitcher';
import LiveRate from 'shared/components/LiveRate';

import { themeVariables } from 'shared/theme';

import {
  calculateExchangeRate,
  isValidExchange,
} from 'shared/utils/exchangeUtils';

const useStyles = makeStyles(() => ({
  mainContentContainer: { height: '580px', position: 'relative' },
  loaderContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationContainer: {
    backgroundColor: themeVariables.colors.paleBlue,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeVariables.colors.paleBlue,
    padding: '0 15px',
    '& .MuiButton-containedPrimary': {
      width: '100%',
      height: '40px',
      borderRadius: '12px',
      textTransform: 'none',
    },
  },
}));

const Exchanger = () => {
  const LIVE_RATE_FETCH_INTERVAL = 10000;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const liveRateContext = useLiveRateContext();
  const liveRateDispatch = useLiveRateDispatch();

  const balanceContext = useBalanceContext();
  const balanceDispatch = useBalanceDispatch();

  const {
    handleCurrencyChange,
    handleAmountChange,
    handleCurrencySwitch,
    handleExchange,
    source,
    setSource,
    destination,
    setDestination,
    liveRate,
    setLiveRate,
  } = useExchanger({
    balanceContext,
    liveRateContext,
    balanceDispatch,
    updateBalance,
    enqueueSnackbar,
  });

  useEffect(() => {
    if (liveRateContext.data) {
      setLiveRate(
        calculateExchangeRate(
          source.currency,
          destination.currency,
          liveRateContext.data,
        ),
      );
    }
    if (balanceContext.data) {
      setSource((prevState) => ({
        ...prevState,
        balance: balanceContext.data[prevState.currency],
      }));
      setDestination((prevState) => ({
        ...prevState,
        balance: balanceContext.data[prevState.currency],
      }));
    }
  }, [
    liveRateContext,
    balanceContext,
    source.currency,
    destination.currency,
    setSource,
    setDestination,
    setLiveRate,
  ]);

  useEffect(() => {
    // fetch rates on first load and then fetch every LIVE_RATE_FETCH_INTERVAL sec
    fetchLiveRate(liveRateDispatch);
    const intervalId = setInterval(
      () => fetchLiveRate(liveRateDispatch),
      LIVE_RATE_FETCH_INTERVAL,
    );
    return () => clearInterval(intervalId);
  }, [liveRateDispatch]);

  return (
    <Grid container className={classes.mainContentContainer}>
      {!liveRateContext.data && liveRateContext.loading ? (
        <Grid item xs={12} className={classes.loaderContainer}>
          <CircularProgress data-testid="loading-indicator" />
        </Grid>
      ) : (
        <>
          <Grid item xs={12}>
            <ExchangeItem
              type="source"
              currency={source.currency}
              balance={source.balance}
              onCurrencyChange={handleCurrencyChange}
              onAmountChange={handleAmountChange}
              amount={source.amount}
            />
          </Grid>
          <Grid item>
            <CurrencySwitcher onClick={handleCurrencySwitch} />
          </Grid>
          <Grid item>
            <LiveRate
              rate={liveRate}
              sourceCurrency={source.currency}
              destinationCurrency={destination.currency}
            />
          </Grid>
          <Grid item xs={12} className={classes.destinationContainer}>
            <ExchangeItem
              type="destination"
              currency={destination.currency}
              balance={destination.balance}
              onCurrencyChange={handleCurrencyChange}
              onAmountChange={handleAmountChange}
              amount={destination.amount}
            />
          </Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              disabled={
                !isValidExchange(source, destination, liveRateContext.data) ||
                balanceContext.loading
              }
              onClick={handleExchange}
              data-testid="exchange-button"
            >
              <Typography variant="body1">Exchange</Typography>
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Exchanger;
