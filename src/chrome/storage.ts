export const storageKey = ['tasks'] as const;
export type StorageKey = (typeof storageKey)[number];

export const syncSet = async (key: StorageKey, value: object): Promise<void> => {
  chrome.storage.sync.set({ [key]: value });
};

export const syncGet = async <T extends object>(key: StorageKey): Promise<T> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, (result) => {
      resolve(result[key]);
    });
  });
};
