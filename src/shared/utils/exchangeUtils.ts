import { Currency } from '../types';
import { ExchangeItemType } from 'shared/components/ExchangeItem/types';
import { LiveRateData } from 'modules/Exchanger/types/liveRateTypes';

export const isValidTwoDecimalPlaceNumber = (value: number): boolean => {
  const regex = new RegExp(/^\d*\.?\d{0,2}$/);
  return regex.test(value.toString());
};

export const calculateExchangeRate = (
  sourceCurrency: Currency,
  destinationCurrency: Currency,
  rates: LiveRateData | null,
) => {
  if (!rates) {
    return;
  }
  const sourceRate = rates[sourceCurrency];
  const destinationRate = rates[destinationCurrency];
  if (!sourceRate || !destinationRate) {
    return -1;
  }
  return Number((destinationRate / sourceRate).toFixed(2));
};

export const calculateExchangeAmount = (
  sourceCurrency: Currency,
  destinationCurrency: Currency,
  rates: LiveRateData | null,
  amount: number,
): number => {
  const exchangeRate = calculateExchangeRate(
    sourceCurrency,
    destinationCurrency,
    rates,
  );
  if (!exchangeRate) {
    return -1;
  }
  return Number((amount * exchangeRate).toFixed(2));
};

export const isValidExchange = (
  source: ExchangeItemType,
  destination: ExchangeItemType,
  rates: LiveRateData | null,
): boolean => {
  if (
    source.currency === destination.currency ||
    !source.amount ||
    !destination.amount ||
    !rates ||
    !rates[source.currency] ||
    !rates[destination.currency]
  ) {
    return false;
  }
  return source.amount <= source.balance;
};

export const MAX_AMOUNT_ALLOWED_TO_EXCHANGE = 99999.99;
