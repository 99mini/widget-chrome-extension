export const getRecentlyClosedTabList = async (limit = 10): Promise<chrome.tabs.Tab[]> => {
  return new Promise((resolve, reject) => {
    chrome.sessions.getRecentlyClosed((sessions) => {
      if (!sessions) {
        resolve([]);
        return;
      }
      const recentlyClosedTabs: chrome.tabs.Tab[] = [];

      for (const session of sessions) {
        if (recentlyClosedTabs.length >= limit) {
          break;
        }
        if (session.tab) {
          recentlyClosedTabs.push(session.tab);
        }
      }

      resolve(recentlyClosedTabs);

      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
};

export const restoryTab = async (sessionId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.sessions.restore(sessionId, () => {
      resolve();
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
    });
  });
};
