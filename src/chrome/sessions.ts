export const getRecentlyClosedTabList = async (limit = 10): Promise<chrome.tabs.Tab[]> => {
  return new Promise((resolve, reject) => {
    chrome.sessions.getRecentlyClosed((sessions) => {
      if (!sessions) {
        resolve([]);
        return;
      }
      const recentlyClosedTabs: chrome.tabs.Tab[] = [];
      sessions.slice(0, limit).forEach((session) => {
        if (session.tab) {
          recentlyClosedTabs.push(session.tab);
        }
      });
      resolve(recentlyClosedTabs);

      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
};
