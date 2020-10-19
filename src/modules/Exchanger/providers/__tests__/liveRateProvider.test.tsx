import React, { FC } from 'react';
import { render, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from 'jest-fetch-mock';

import { LiveRateProvider } from '../LiveRateProvider';
import LiveRateConsumer from '../mockConsumers/LiveRateConsumer';
import { mockLiveRateResponse } from 'shared/utils/mockData';

describe('Tests for LiveRateProvider', () => {
  beforeEach(() => {
    fetch.enableMocks();
    // @ts-ignore
    fetch.mockIf(/^https?:\/\/api.exchangeratesapi.io.*$/, () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify(mockLiveRateResponse),
      });
    });
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it('should render consumer with default provider values', () => {
    const wrapper: FC = ({ children }) => (
      <LiveRateProvider>{children}</LiveRateProvider>
    );

    const { getByTestId } = render(<LiveRateConsumer />, { wrapper });

    expect(getByTestId('rate-gbp')).toHaveTextContent('');
    expect(getByTestId('rate-usd')).toHaveTextContent('');
  });

  it('should update source and destination balance on clicking exchange button', async () => {
    const wrapper: FC = ({ children }) => (
      <LiveRateProvider>{children}</LiveRateProvider>
    );

    const { getByRole, getByTestId } = render(<LiveRateConsumer />, {
      wrapper,
    });

    act(() => userEvent.click(getByRole('button')));

    await waitFor(() =>
      expect(getByTestId('rate-gbp')).toHaveTextContent('0.90915'),
    );
    await waitFor(() =>
      expect(getByTestId('rate-usd')).toHaveTextContent('1.1741'),
    );
  });
});
