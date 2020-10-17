import { Currency } from '../types';
import { LiveRateData } from '../../modules/Exchanger/types';

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
  console.log(sourceCurrency, destinationCurrency, sourceRate, destinationRate);
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
) => {
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
