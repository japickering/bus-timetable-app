import { render, screen, mock } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/bus departures/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders table headers', () => {
  render(<App />);
  const textElement = screen.getByText(/departs/i);
  expect(textElement).toBeInTheDocument();
});
