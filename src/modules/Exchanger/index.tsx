import React, { useEffect, useState } from 'react';
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

import ExchangeItem from '../../shared/components/ExchangeItem';
import CurrencySwitcher from '../../shared/components/CurrencySwitcher';
import LiveRate from '../../shared/components/LiveRate';
import { ExchangeItemType } from '../../shared/components/ExchangeItem/types';
import { themeVariables } from '../../shared/theme';
import { Currency } from '../../shared/types';
import {
  calculateExchangeRate,
  calculateExchangeAmount,
  isValidExchange,
} from '../../shared/utils/exchangeUtils';

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

  const [source, setSource] = useState<ExchangeItemType>({
    currency: Currency.EUR,
    amount: 0,
    balance: balanceContext.data[Currency.EUR],
  });

  const [destination, setDestination] = useState<ExchangeItemType>({
    currency: Currency.GBP,
    amount: 0,
    balance: balanceContext.data[Currency.GBP],
  });

  const [liveRate, setLiveRate] = useState<number | undefined>(undefined);

  const handleCurrencyChange = (type: string, currency: Currency) => {
    type === 'source'
      ? setSource({ ...source, currency })
      : setDestination({ ...destination, currency });

    if (type === 'source') {
      setSource({ ...source, currency });
      setDestination({
        ...destination,
        amount: calculateExchangeAmount(
          currency,
          destination.currency,
          liveRateContext.data,
          source.amount,
        ),
      });
    } else {
      setDestination({ ...destination, currency });
      setSource({
        ...source,
        amount: calculateExchangeAmount(
          source.currency,
          currency,
          liveRateContext.data,
          destination.amount,
        ),
      });
    }
  };

  const handleAmountChange = (type: string, amount: number) => {
    if (type === 'source') {
      setSource({ ...source, amount });
      setDestination({
        ...destination,
        amount: calculateExchangeAmount(
          source.currency,
          destination.currency,
          liveRateContext.data,
          amount,
        ),
      });
    } else {
      setDestination({ ...destination, amount });
      setSource({
        ...source,
        amount: calculateExchangeAmount(
          source.currency,
          destination.currency,
          liveRateContext.data,
          amount,
        ),
      });
    }
  };

  const handleCurrencySwitch = () => {
    const tmpSource = source;
    setSource(destination);
    setDestination(tmpSource);
  };

  const handleExchange = () => {
    updateBalance(
      balanceContext,
      balanceDispatch,
      source,
      destination,
      liveRate as number,
      enqueueSnackbar,
    );
    setSource({ ...source, amount: 0 });
    setDestination({ ...destination, amount: 0 });
  };

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
      setSource({ ...source, balance: balanceContext.data[source.currency] });
      setDestination({
        ...destination,
        balance: balanceContext.data[destination.currency],
      });
    }
  }, [liveRateContext, balanceContext]);

  useEffect(() => {
    // fetch rates on first load and then fetch every 10 sec
    fetchLiveRate(liveRateDispatch);
    const intervalId = setInterval(
      () => fetchLiveRate(liveRateDispatch),
      LIVE_RATE_FETCH_INTERVAL,
    );
    return () => clearInterval(intervalId);
  }, [liveRateDispatch]);

  return (
    <Grid container className={classes.mainContentContainer}>
      {!liveRateContext.data ? (
        <Grid item xs={12} className={classes.loaderContainer}>
          <CircularProgress />
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
