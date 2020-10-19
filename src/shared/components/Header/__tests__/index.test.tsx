import React from 'react';

import { render } from '../../../utils/testUtils';
import Header from '../index';

describe('Tests for Header component', () => {
  it('should render Header with header text', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Exchange')).toBeInTheDocument();
  });
});
