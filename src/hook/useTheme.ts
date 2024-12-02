import { syncGet, syncSet } from '@/chrome/storage';
import { create, StateCreator } from 'zustand';

type ThemeModeType = 'light' | 'dark' | 'custom';

type ThemeStoreType = {
  mode: ThemeModeType;
  primaryColor?: string;
  actions: {
    getMode: () => Promise<ThemeModeType>;
    setMode: (mode: Omit<ThemeModeType, 'custom'>) => Promise<void>;
    setPrimaryColor: (color: string) => Promise<void>;
  };
};

const initialTheme: StateCreator<ThemeStoreType, [], [], ThemeStoreType> = (set) => ({
  mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : ('light' as ThemeModeType),

  actions: {
    getMode: async () => {
      const theme = await syncGet('theme');
      console.log(theme);

      set({ mode: theme as ThemeModeType });
      return theme as ThemeModeType;
    },
    setMode: async (mode) => {
      await syncSet('theme', { theme: mode });

      set({ mode: mode as ThemeModeType | undefined });
    },
    setPrimaryColor: async (color) => {
      await syncSet('theme', { theme: 'custom' });
      await syncSet('primaryColor', color);

      set({ mode: 'custom', primaryColor: color });
    },
  },
});

const useThemeStore = create<ThemeStoreType>(initialTheme);

export default useThemeStore;
