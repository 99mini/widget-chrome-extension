import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  console.debug('mode:', mode);
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          newtab: 'index.html',
        },
      },
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : undefined,
    },
    define: {
      MOCK_CHROME: mode === 'development',
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './.config/vitest.ts',
    },
  };
});
