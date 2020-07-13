import React from 'react';
import { render } from '@testing-library/react';

import Weather from './weather';

describe(' Weather', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Weather />);
    expect(baseElement).toBeTruthy();
  });
});
