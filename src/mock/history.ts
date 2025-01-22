import historyMockData from './history.mock';

const history = {
  search: (query: chrome.history.HistoryQuery, callback: (results: chrome.history.HistoryItem[]) => void): void => {
    const results = historyMockData.filter((item) => item.url.includes(query.text ?? ''));
    callback(results);
  },
};

export default history;
