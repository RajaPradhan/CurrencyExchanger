import {
  calculateExchangeAmount,
  calculateExchangeRate,
  isValidExchange,
  isValidTwoDecimalPlaceNumber,
} from '../exchangeUtils';
import { Currency } from 'shared/types';
import { mockLiveRateState, mockSource, mockDestination } from '../mockData';

describe('Tests for exchangeUtils', () => {
  it('should return a valid exchange rate', () => {
    const rate = calculateExchangeRate(
      Currency.EUR,
      Currency.GBP,
      mockLiveRateState,
    );

    expect(rate).toBe(0.91);
  });

  it('should return an invalid exchange rate', () => {
    const rate = calculateExchangeRate(Currency.EUR, Currency.GBP, null);

    expect(rate).toBe(undefined);
  });

  it('should return the correct exchange amount', () => {
    const amount = calculateExchangeAmount(
      Currency.EUR,
      Currency.GBP,
      mockLiveRateState,
      10,
    );

    expect(amount).toBe(9.1);
  });

  it('should return an invalid exchange amount', () => {
    const amount = calculateExchangeAmount(
      Currency.EUR,
      Currency.GBP,
      null,
      10,
    );

    expect(amount).toBe(-1);
  });

  it('should return true for a valid exchange', () => {
    const isValid = isValidExchange(
      mockSource,
      mockDestination,
      mockLiveRateState,
    );

    expect(isValid).toBe(true);
  });

  it('should return false for an invalid exchange -> sourceAmount > sourceBalance', () => {
    const isValid = isValidExchange(
      { ...mockSource, amount: 1234 },
      mockDestination,
      mockLiveRateState,
    );

    expect(isValid).toBe(false);
  });

  it('should return false for an invalid exchange -> sourceCurrency = destinationCurrency', () => {
    const isValid = isValidExchange(mockSource, mockSource, mockLiveRateState);

    expect(isValid).toBe(false);
  });

  it('should return false for an invalid exchange -> sourceAmount = 0', () => {
    const isValid = isValidExchange(
      { ...mockSource, amount: 0 },
      mockSource,
      mockLiveRateState,
    );

    expect(isValid).toBe(false);
  });

  it('should return test the isValidTwoDecimalPlaceNumber function', () => {
    expect(isValidTwoDecimalPlaceNumber(12.58)).toBe(true);
    expect(isValidTwoDecimalPlaceNumber(34.896)).toBe(false);
    expect(isValidTwoDecimalPlaceNumber(123)).toBe(true);
    expect(isValidTwoDecimalPlaceNumber(NaN)).toBe(false);
  });
});
