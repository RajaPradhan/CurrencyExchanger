import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { render } from '@testing-library/react';

import ExchangeProvider from '../../modules/Exchanger/providers/ExchangeProvider';
import { defaultTheme } from './mockData';

export enum Selectors {
  LOADING_INDICATOR = 'loading-indicator',
  SOURCE_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD = 'source-exchange-item-amount-input-field',
  DESTINATION_EXCHANGE_ITEM_AMOUNT_INPUT_FIELD = 'destination-exchange-item-amount-input-field',
  SOURCE_EXCHANGE_ITEM_BALANCE_TEXT = 'source-exchange-item-balance-text',
  DESTINATION_EXCHANGE_ITEM_BALANCE_TEXT = 'destination-exchange-item-balance-text',
  EXCHANGE_BUTTON = 'exchange-button',
  SOURCE_EXCHANGE_ITEM_SELECTED_CURRENCY_TEXT = 'source-exchange-item-selected-currency-text',
  DESTINATION_EXCHANGE_ITEM_SELECTED_CURRENCY_TEXT = 'destination-exchange-item-selected-currency-text',
  SOURCE_EXCHANGE_ITEM_CURRENCY_SELECTOR = 'div[data-testid=source-exchange-item-currency-selector] .MuiSelect-select',
  DESTINATION_EXCHANGE_ITEM_CURRENCY_SELECTOR = 'div[data-testid=destination-exchange-item-currency-selector] .MuiSelect-select',
  SOURCE_EXCHANGE_ITEM_CURRENCY_MENUITEM_2 = 'source-exchange-item-currency-menuitem-2',
  DESTINATION_EXCHANGE_ITEM_CURRENCY_MENUITEM_0 = 'destination-exchange-item-currency-menuitem-0',
  LIVE_RATE = 'live-rate',
  CURRENCY_SWITCHER = 'currency-switcher',
}

type Props = {
  children: JSX.Element;
};

const Providers = ({ children }: Props) => (
  <ThemeProvider theme={defaultTheme}>
    <ExchangeProvider>{children}</ExchangeProvider>
  </ThemeProvider>
);

const customRender = (ui: JSX.Element, options?: any) =>
  render(ui, { wrapper: Providers, ...options });

// override render method
export { customRender as render };
