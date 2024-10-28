/* eslint-disable @typescript-eslint/no-explicit-any */

const storage = {
  sync: {
    get: (key: string, callback: (result: { [key: string]: any }) => void) => {
      const mockData = { [key]: localStorage.getItem(key) };

      callback(mockData);
    },
    set: (items: { [key: string]: any }, callback?: () => void) => {
      Object.entries(items).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
      if (callback) callback();
    },
  },
};

export default storage;
