/* eslint-disable @typescript-eslint/no-explicit-any */

const storage = {
  sync: {
    get: (key: string): void => {
      const value = localStorage.getItem(key);

      return value ? JSON.parse(value) : undefined;
    },
    set: (items: { [key: string]: any }, callback?: () => void) => {
      Object.entries(items).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
      if (callback) callback();
    },
    clear: async () => {
      localStorage.clear();
    },
    QUOTA_BYTES_PER_ITEM: 2048,
  },
};

export default storage;
