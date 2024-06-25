import '@testing-library/jest-dom/';

jest.mock('~/constants/enviroment', () => ({
  ENVIROMENT: {
    API_URL: 'http://localhost:3000',
  },
}));
