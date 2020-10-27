import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Todo from "./todo";

describe('<todo />', () => {
  test('it should mount', () => {
    render(<Todo/>);
    
    const todo = screen.getByTestId('todo');

    expect(todo).toBeInTheDocument();
  });
});
