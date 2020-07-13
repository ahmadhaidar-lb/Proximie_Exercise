import React from 'react';
import { render } from '@testing-library/react';

import Googlebooks from './googlebooks';

describe(' Googlebooks', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Googlebooks />);
    expect(baseElement).toBeTruthy();
  });
});
