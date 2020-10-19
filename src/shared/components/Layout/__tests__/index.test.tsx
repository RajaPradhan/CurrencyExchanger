import React from 'react';

import { render } from '../../../utils/testUtils';
import Layout from '../index';

describe('Tests for Layout component', () => {
  it('should render Layout with children', () => {
    const { getByText } = render(
      <Layout>
        <div>Layout children</div>
      </Layout>,
    );

    expect(getByText('Layout children')).toBeInTheDocument();
  });
});
