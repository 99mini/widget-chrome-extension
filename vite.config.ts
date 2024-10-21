import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        newtab: 'index.html',
      },
    },
  },
  define: {
    MOCK_CHROME: mode === 'development',
  },
}));
