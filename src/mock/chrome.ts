/* eslint-disable @typescript-eslint/no-explicit-any */

const mockChrome = {
  storage: {
    sync: {
      get: (keys: string[], callback: (result: { [key: string]: any }) => void) => {
        const mockData = keys.reduce(
          (acc, key) => {
            acc[key] = localStorage.getItem(key) || null;
            return acc;
          },
          {} as { [key: string]: any }
        );

        callback(mockData);
      },
      set: (items: { [key: string]: any }, callback?: () => void) => {
        Object.entries(items).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        if (callback) callback();
      },
    },
  },
};

export default mockChrome;
