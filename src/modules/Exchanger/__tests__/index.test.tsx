import React from 'react';
import fetchMock from 'jest-fetch-mock';
import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render, Selectors } from '../../../shared/utils/testUtils';
import { mockLiveRateData } from '../../../shared/utils/mockData';
import Exchanger from '../index';

describe('Tests for exchange screen', () => {
  beforeEach(() => {
    // @ts-ignore
    fetchMock.mockIf(/^https?:\/\/api.exchangeratesapi.io.*$/, () => {
      return Promise.resolve({
        status: 200,
        body: JSON.stringify(mockLiveRateData),
      });
    });
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should render the screen with default values', async () => {
    const { getByLabelText, getByTestId, queryByTestId } = render(
      <Exchanger />,
    );

    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.LOADING_INDICATOR),
    );

    expect(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '');
    expect(
      getByLabelText(Selectors.DESTINATION_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '');
    expect(
      getByTestId(Selectors.SOURCE_EXCHANGE_ITEM_BALANCE_TEXT),
    ).toHaveTextContent('Balance: 1000 €');
    expect(
      getByTestId(Selectors.DESTINATION_EXCHANGE_ITEM_BALANCE_TEXT),
    ).toHaveTextContent('Balance: 500 £');
    expect(getByTestId(Selectors.EXCHANGE_BUTTON)).toBeDisabled();
    expect(
      getByTestId(Selectors.SOURCE_EXCHANGE_ITEM_SELECTED_CURRENCY_TEXT),
    ).toHaveTextContent('EUR');
    expect(
      getByTestId(Selectors.DESTINATION_EXCHANGE_ITEM_SELECTED_CURRENCY_TEXT),
    ).toHaveTextContent('GBP');
    expect(getByTestId(Selectors.LIVE_RATE)).toHaveTextContent('1 € = 0.91 £');
  });

  it('should change the destination amount as per the live rate when source amount is changed', async () => {
    const { getByLabelText, queryByTestId } = render(<Exchanger />);
    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.LOADING_INDICATOR),
    );

    userEvent.type(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
      '10',
    );

    expect(
      getByLabelText(Selectors.DESTINATION_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '9.1');
  });

  it('should change the source amount as per the live rate when destination amount is changed', async () => {
    const { getByLabelText, queryByTestId } = render(<Exchanger />);
    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.LOADING_INDICATOR),
    );

    userEvent.type(
      getByLabelText(Selectors.DESTINATION_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
      '10',
    );

    expect(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '11');
  });

  it('should change the source balance and live rate when source currency selection is changed', async () => {
    const { queryByTestId, getByTestId, container } = render(<Exchanger />);
    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.LOADING_INDICATOR),
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

    expect(
      getByTestId(Selectors.SOURCE_EXCHANGE_ITEM_SELECTED_CURRENCY_TEXT),
    ).toHaveTextContent('USD');
    expect(
      getByTestId(Selectors.SOURCE_EXCHANGE_ITEM_BALANCE_TEXT),
    ).toHaveTextContent('Balance: 100 $');
    expect(getByTestId(Selectors.LIVE_RATE)).toHaveTextContent('1 $ = 0.77 £');
  });

  it('should change the destination balance and live rate when destination currency selection is changed', async () => {
    const { queryByTestId, getByTestId, container } = render(<Exchanger />);
    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.LOADING_INDICATOR),
    );

    userEvent.click(
      container.querySelector(
        Selectors.DESTINATION_EXCHANGE_ITEM_CURRENCY_SELECTOR,
      ) as Element,
    );
    userEvent.click(
      getByTestId(Selectors.DESTINATION_EXCHANGE_ITEM_CURRENCY_MENUITEM_0),
    );
    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.DESTINATION_EXCHANGE_ITEM_CURRENCY_MENUITEM_0),
    );

    expect(
      getByTestId(Selectors.DESTINATION_EXCHANGE_ITEM_SELECTED_CURRENCY_TEXT),
    ).toHaveTextContent('EUR');
    expect(
      getByTestId(Selectors.DESTINATION_EXCHANGE_ITEM_BALANCE_TEXT),
    ).toHaveTextContent('Balance: 1000 €');
    expect(getByTestId(Selectors.LIVE_RATE)).toHaveTextContent('1 € = 1 €');
  });

  it('should switch source and destination when currency switcher is clicked', async () => {
    const { queryByTestId, getByLabelText, getByTestId } = render(
      <Exchanger />,
    );
    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.LOADING_INDICATOR),
    );

    userEvent.type(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
      '10',
    );
    userEvent.click(getByTestId(Selectors.CURRENCY_SWITCHER));

    expect(
      getByTestId(Selectors.SOURCE_EXCHANGE_ITEM_SELECTED_CURRENCY_TEXT),
    ).toHaveTextContent('GBP');
    expect(
      getByTestId(Selectors.SOURCE_EXCHANGE_ITEM_BALANCE_TEXT),
    ).toHaveTextContent('Balance: 500 £');
    expect(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '9.1');
    expect(getByTestId(Selectors.LIVE_RATE)).toHaveTextContent('1 £ = 1.1 €');
    expect(
      getByTestId(Selectors.DESTINATION_EXCHANGE_ITEM_SELECTED_CURRENCY_TEXT),
    ).toHaveTextContent('EUR');
    expect(
      getByTestId(Selectors.DESTINATION_EXCHANGE_ITEM_BALANCE_TEXT),
    ).toHaveTextContent('Balance: 1000 €');

    expect(
      getByLabelText(Selectors.DESTINATION_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '10');
  });

  it('should disable the exchange currency button when source amount is empty', async () => {
    const { queryByTestId, getByLabelText, getByTestId } = render(
      <Exchanger />,
    );
    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.LOADING_INDICATOR),
    );

    expect(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '');
    expect(
      getByLabelText(Selectors.DESTINATION_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '');
    expect(getByTestId(Selectors.EXCHANGE_BUTTON)).toBeDisabled();
  });

  it('should disable the exchange currency button when source amount exceeds source balance', async () => {
    const { queryByTestId, getByLabelText, getByTestId } = render(
      <Exchanger />,
    );
    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.LOADING_INDICATOR),
    );

    userEvent.type(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
      '1234',
    );

    expect(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '1234');
    expect(getByTestId(Selectors.EXCHANGE_BUTTON)).toBeDisabled();
  });

  it('should disable the exchange currency button when typing a destination amount makes the source amount exceed source balance', async () => {
    const { queryByTestId, getByLabelText, getByTestId } = render(
      <Exchanger />,
    );
    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.LOADING_INDICATOR),
    );

    userEvent.type(
      getByLabelText(Selectors.DESTINATION_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
      '1234',
    );

    expect(
      getByLabelText(Selectors.DESTINATION_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '1234');
    expect(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '1357.4');
    expect(getByTestId(Selectors.EXCHANGE_BUTTON)).toBeDisabled();
  });

  it('should update balance of source and destination when currency exchange button is clicked', async () => {
    const { queryByTestId, getByLabelText, getByTestId } = render(
      <Exchanger />,
    );
    await waitForElementToBeRemoved(() =>
      queryByTestId(Selectors.LOADING_INDICATOR),
    );

    userEvent.type(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
      '123',
    );

    expect(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '123');
    expect(
      getByLabelText(Selectors.DESTINATION_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '111.93');
    expect(getByTestId(Selectors.EXCHANGE_BUTTON)).not.toBeDisabled();

    userEvent.click(getByTestId(Selectors.EXCHANGE_BUTTON));

    expect(
      getByTestId(Selectors.SOURCE_EXCHANGE_ITEM_BALANCE_TEXT),
    ).toHaveTextContent('Balance: 877 €');
    expect(
      getByTestId(Selectors.DESTINATION_EXCHANGE_ITEM_BALANCE_TEXT),
    ).toHaveTextContent('Balance: 611.93 £');
    expect(
      getByLabelText(Selectors.SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '');
    expect(
      getByLabelText(Selectors.DESTINATION_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD),
    ).toHaveAttribute('value', '');
  });
});
