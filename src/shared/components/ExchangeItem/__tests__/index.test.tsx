import React from 'react';
import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render, Selectors } from '../../../utils/testUtils';
import { Currency } from '../../../types';
import ExchangeItem from '../index';

describe('Tests for ExchangeItem component', () => {
  it('should render ExchangeItem with the passed props', () => {
    const onCurrencyChange = jest.fn();
    const onAmountChange = jest.fn();

    const { getByTestId, getByLabelText } = render(
      <ExchangeItem
        type="source"
        currency={Currency.EUR}
        amount={123}
        balance={1000}
        onCurrencyChange={onCurrencyChange}
        onAmountChange={onAmountChange}
      />,
    );

    expect(
      getByTestId(Selectors.SOURCE_EXCHANGE_ITEM_SELECTED_CURRENCY_TEXT),
    ).toHaveTextContent('EUR');
    expect(
      getByTestId(Selectors.SOURCE_EXCHANGE_ITEM_BALANCE_TEXT),
    ).toHaveTextContent('Balance: 1000 €');
    expect(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '123');
  });

  it('should call currency change handler on changing selected currency', async () => {
    const onCurrencyChange = jest.fn();
    const onAmountChange = jest.fn();

    const { getByTestId, queryByTestId, container } = render(
      <ExchangeItem
        type="source"
        currency={Currency.EUR}
        amount={123}
        balance={1000}
        onCurrencyChange={onCurrencyChange}
        onAmountChange={onAmountChange}
      />,
    );

    userEvent.click(
      container.querySelector(
        Selectors.SOURCE_EXCHANGE_ITEM_CURRENCY_SELECTOR,
      ) as Element,
    );
    userEvent.click(
      getByTestId(Selectors.SOURCE_EXCHANGE_ITEM_CURRENCY_MENUITEM_2),
    );
    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.SOURCE_EXCHANGE_ITEM_CURRENCY_MENUITEM_2),
    );

    expect(onCurrencyChange).toHaveBeenCalled();
  });

  it('should call amount change handler on changing value in the amount field', async () => {
    const onCurrencyChange = jest.fn();
    const onAmountChange = jest.fn();

    const { getByLabelText } = render(
      <ExchangeItem
        type="source"
        currency={Currency.EUR}
        amount={123}
        balance={1000}
        onCurrencyChange={onCurrencyChange}
        onAmountChange={onAmountChange}
      />,
    );

    userEvent.type(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
      '10',
    );

    expect(onAmountChange).toHaveBeenCalled();
  });
});
