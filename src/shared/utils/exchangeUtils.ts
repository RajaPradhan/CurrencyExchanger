import { Currency } from '../types';
import { ExchangeItemType } from 'shared/components/ExchangeItem/types';
import { LiveRateData } from 'modules/Exchanger/types/liveRateTypes';

export const MAX_AMOUNT_ALLOWED_TO_EXCHANGE = 999999999.99; // An assumption

export const convertToFixedDecimalPlace = (decimalPlace: number = 2) => (
  value: number,
): number => Number(value.toFixed(decimalPlace));

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
  return convertToFixedDecimalPlace(2)(destinationRate / sourceRate);
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
  return convertToFixedDecimalPlace(2)(amount * exchangeRate);
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
