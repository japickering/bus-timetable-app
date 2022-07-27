import { render, screen } from '@testing-library/react';
import BusTimetable from './classes/BusTimetable';
import Timetable from './components/Timetable';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/bus departures/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders table headers', () => {
  render(<App />);
  const textElement = screen.getByText(/bus route/i);
  expect(textElement).toBeInTheDocument();
  const textElement2 = screen.getByText(/departs/i);
  expect(textElement2).toBeInTheDocument();
});

test('Bus Timetable class is defined', () => {
  const timetable = new BusTimetable();
  expect(timetable).toBeDefined();
});

test('Timetable component is defined', () => {
  //   const timetable = new BusTimetable();
  expect(Timetable).toBeDefined();
});
