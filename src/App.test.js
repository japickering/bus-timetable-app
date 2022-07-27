import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
});

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/bus departures/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders table headers', () => {
  render(<App />);
  const textElement = screen.getByText(/bus route/i);
  expect(textElement).toBeInTheDocument();
  const textElement2 = screen.getByText(/times/i);
  expect(textElement2).toBeInTheDocument();
});
