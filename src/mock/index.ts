import mockChrome from './chrome';

const mock = () => {
  if (typeof MOCK_CHROME !== 'undefined' && MOCK_CHROME) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).chrome = mockChrome;
  }
};

export default mock;
