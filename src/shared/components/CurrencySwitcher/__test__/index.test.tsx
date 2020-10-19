import React from 'react';
import userEvent from '@testing-library/user-event';

import { render, Selectors } from '../../../utils/testUtils';
import CurrencySwitcher from '../index';

describe('Tests for CurrencySwitcher component', () => {
  it('should call the onclick handler on clicking the component', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<CurrencySwitcher onClick={onClick} />);

    userEvent.click(getByTestId(Selectors.CURRENCY_SWITCHER));

    expect(onClick).toHaveBeenCalled();
  });
});
