export const getRecentlyVisitedSites = async ({
  text = '',
  maxResults = 10,
  startTime,
}: Partial<chrome.history.HistoryQuery>): Promise<chrome.history.HistoryItem[]> => {
  return new Promise((resolve, reject) => {
    chrome.history.search({ text, maxResults, startTime }, (items) => {
      resolve(items);
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
};
