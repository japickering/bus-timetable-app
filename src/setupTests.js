// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { mockFetch } from './libs/times';

const host = 'https://localhost:3000';

test('runs mock fetch for leeds times', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(mockFetch(`${host}/leeds`));
});

test('runs mock fetch for wakefield times', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(mockFetch(`${host}/wakefield`));
});

test('runs mock fetch for doncaster times', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(mockFetch(`${host}/doncaster`));
});

test('runs mock fetch for sheffield times', async () => {
  jest.spyOn(window, 'fetch').mockImplementation(mockFetch(`${host}/sheffield`));
});

afterEach(() => {
  jest.restoreAllMocks();
});
