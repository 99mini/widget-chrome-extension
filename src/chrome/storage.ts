export const storageKey = ['tasks', 'theme', 'primaryColor', 'widgets', 'region'] as const;
export type StorageKey = (typeof storageKey)[number];

export const syncSet = async (key: StorageKey, value: object | string): Promise<void> => {
  console.count('syncSet');

  const json = JSON.stringify(value);
  const chunkSize = chrome.storage.sync.QUOTA_BYTES_PER_ITEM / 4;

  const chunkCount = Math.ceil(json.length / chunkSize);

  await chrome.storage.sync.set({ [key + '0']: chunkCount });

  for (let i = 1; i <= chunkCount; i++) {
    const chunk = json.substr((i - 1) * chunkSize, chunkSize);
    await chrome.storage.sync.set({ [key + String(i)]: chunk });
  }
};

export const syncGet = async <T extends object | string>(key: StorageKey): Promise<T | undefined> => {
  const value = await chrome.storage.sync.get(key + '0');

  if (!value) return undefined;

  const chunkCount = parseInt(value[key + '0']);
  let json = '';

  for (let i = 1; i <= chunkCount; i++) {
    const k = key + String(i);
    json += (await chrome.storage.sync.get(k))[k];
  }

  console.dir(json);

  if (!json) return undefined;

  return JSON.parse(json);
};

export const syncClear = async (): Promise<void> => {
  await chrome.storage.sync.clear();
};
