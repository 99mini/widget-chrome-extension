/* eslint-disable @typescript-eslint/no-explicit-any */

const storage = {
  sync: {
    get: (key: string, callback: (items: { [key: string]: any }) => void): void => {
      const mockData = JSON.parse(localStorage.getItem(key) ?? '{}');
      callback(mockData);
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
