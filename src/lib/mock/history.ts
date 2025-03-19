import historyMockData from './history.mock';

const history = {
  search: (query: chrome.history.HistoryQuery, callback: (results: chrome.history.HistoryItem[]) => void): void => {
    const results = historyMockData
      .filter((item) => item.url.includes(query.text ?? '') && item.lastVisitTime >= Date.now() - 1000 * 60 * 60 * 24)
      .slice(0, query.maxResults);
    callback(results);
  },
};

export default history;
