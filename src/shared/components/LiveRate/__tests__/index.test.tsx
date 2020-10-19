import React from 'react';

import { render, Selectors } from 'shared/utils/testUtils';
import { Currency } from 'shared/types';
import LiveRate from '../index';

describe('Tests for LiveRate component', () => {
  it('should render LiveRate with the passed props', () => {
    const { getByTestId } = render(
      <LiveRate
        rate={0.91}
        sourceCurrency={Currency.EUR}
        destinationCurrency={Currency.GBP}
      />,
    );

    expect(getByTestId(Selectors.LIVE_RATE)).toHaveTextContent('1 € = 0.91 £');
  });
});
