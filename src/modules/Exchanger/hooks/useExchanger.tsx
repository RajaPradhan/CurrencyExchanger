import { useState } from 'react';

import { Currency } from 'shared/types';
import { ExchangeItemType } from 'shared/components/ExchangeItem/types';
import { calculateExchangeAmount } from 'shared/utils/exchangeUtils';

const useExchanger = ({
  balanceContext,
  liveRateContext,
  balanceDispatch,
  updateBalance,
  enqueueSnackbar,
}: any) => {
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
          destination.currency,
          source.currency,
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
  return {
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
  };
};

export default useExchanger;
