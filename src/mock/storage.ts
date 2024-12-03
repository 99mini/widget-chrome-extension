/* eslint-disable @typescript-eslint/no-explicit-any */

const storage = {
  sync: {
    get: (key: string, callback: (items: { [key: string]: any }) => void): void => {
      const value = localStorage.getItem(key);

      if (value?.startsWith('{')) {
        callback(JSON.parse(value));
        return;
      }

      callback({ [key]: value?.replace(/"/g, '') });
    },
    set: (items: { [key: string]: any }, callback?: () => void) => {
      Object.entries(items).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
      if (callback) callback();
    },
  },
};

export default storage;
