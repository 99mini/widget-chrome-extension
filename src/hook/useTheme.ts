import { StateCreator, create } from 'zustand';

import { RegionType, ThemeModeType } from '@/types/theme';

import { syncGet, syncSet } from '@/chrome/storage';

type ThemeStoreType = {
  mode: ThemeModeType;
  region: RegionType;
  primaryColor?: string;
  actions: {
    getMode: () => Promise<ThemeModeType>;
    setMode: (mode: Omit<ThemeModeType, 'custom'>) => Promise<void>;
    setPrimaryColor: (color: string) => Promise<void>;
    getRegion: () => Promise<RegionType>;
    setRegion: (region: RegionType) => void;
  };
};

const initialTheme: StateCreator<ThemeStoreType, [], [], ThemeStoreType> = (set) => ({
  mode: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') as ThemeModeType,
  region: 'ko',
  actions: {
    getMode: async () => {
      const theme =
        (await syncGet('theme')) ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

      set({ mode: theme as ThemeModeType });
      return theme as ThemeModeType;
    },
    setMode: async (mode) => {
      await syncSet('theme', mode);

      set({ mode: mode as ThemeModeType | undefined });
    },
    setPrimaryColor: async (color) => {
      await syncSet('theme', 'custom');
      await syncSet('primaryColor', color);

      set({ mode: 'custom', primaryColor: color });
    },
    getRegion: async () => {
      const region: RegionType =
        (await syncGet('region')) ?? (window.navigator.language.startsWith('ko') ? 'ko' : 'en');

      set({ region });
      return region;
    },
    setRegion: async (region) => {
      await syncSet('region', region);

      set({ region });
    },
  },
});

const useThemeStore = create<ThemeStoreType>(initialTheme);

export default useThemeStore;
