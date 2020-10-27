import React from 'react';
import {render} from '@testing-library/react';

import Todo from './todo';

test('renders learn react link', () => {
    const {getByText} = render(<Todo/>);
    const linkElement = getByText(/learn react/);
    expect(linkElement).toBeInTheDocument();
});
