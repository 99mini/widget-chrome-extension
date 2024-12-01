export const storageKey = ['tasks', 'theme', 'primaryColor', 'widgets'] as const;
export type StorageKey = (typeof storageKey)[number];

export const syncSet = async (key: StorageKey, value: object | string): Promise<void> => {
  chrome.storage.sync.set({ [key]: value });
};

export const syncGet = async <T extends object | string>(key: StorageKey): Promise<T> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (result) => {
      resolve(result[key]);
    });
  });
};
