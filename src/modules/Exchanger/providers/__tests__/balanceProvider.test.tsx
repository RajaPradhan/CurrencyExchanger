import React, { FC } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BalanceProvider } from '../BalanceProvider';
import BalanceConsumer from '../mockConsumers/BalanceConsumer';

describe('Tests for BalanceProvider', () => {
  it('should render consumer with default provider values', () => {
    const wrapper: FC = ({ children }) => (
      <BalanceProvider>{children}</BalanceProvider>
    );

    const { getByTestId } = render(<BalanceConsumer />, { wrapper });

    expect(getByTestId('source-balance')).toHaveTextContent('1000');
  });

  it('should update source and destination balance on clicking exchange button', () => {
    const wrapper: FC = ({ children }) => (
      <BalanceProvider>{children}</BalanceProvider>
    );

    const { getByRole, getByTestId } = render(<BalanceConsumer />, { wrapper });

    userEvent.click(getByRole('button'));

    expect(getByTestId('source-balance')).toHaveTextContent('990');
    expect(getByTestId('destination-balance')).toHaveTextContent('509.1');
  });
});
