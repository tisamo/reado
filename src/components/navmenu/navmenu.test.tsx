import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import NavMenu from "./navmenu";

describe('<navmenu />', () => {
  test('it should mount', () => {
    render(<NavMenu/>);
    
    const navmenu = screen.getByTestId('navmenu');

    expect(navmenu).toBeInTheDocument();
  });
});
