export const getRecentlyVisitedSites = async (maxResults = 10): Promise<chrome.history.HistoryItem[]> => {
  return new Promise((resolve, reject) => {
    chrome.history.search({ text: '', maxResults, startTime: Date.now() - 1000 * 60 * 60 * 24 }, (items) => {
      resolve(items);
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
};
