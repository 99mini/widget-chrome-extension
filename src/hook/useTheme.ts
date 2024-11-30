import { syncGet, syncSet } from '@/chrome/storage';
import { create, StateCreator } from 'zustand';

type ThemeModeType = 'light' | 'dark' | 'custom';

type ThemeStoreType = {
  mode: ThemeModeType;
  primaryColor?: string;
  actions: {
    setMode: (mode: Omit<ThemeModeType, 'custom'>) => Promise<void>;
    setPrimaryColor: (color: string) => Promise<void>;
  };
};

const initialTheme: StateCreator<ThemeStoreType, [], [], ThemeStoreType> = (set) => {
  let mode: ThemeModeType = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  syncGet<ThemeModeType>('theme').then((res) => {
    mode = res ?? mode;
    set({ mode });
  });

  return {
    mode,
    actions: {
      setMode: async (mode) => {
        await syncSet('theme', mode);

        set({ mode: mode as ThemeModeType | undefined });
      },
      setPrimaryColor: async (color) => {
        await syncSet('theme', 'custom');
        await syncSet('primaryColor', color);

        set({ mode: 'custom', primaryColor: color });
      },
    },
  };
};

const useThemeStore = create<ThemeStoreType>(initialTheme);

export default useThemeStore;
