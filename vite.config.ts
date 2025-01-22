import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  console.debug('mode:', mode);
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: mode === 'production' ? 'dist' : 'dist-dev',
      rollupOptions: {
        input: {
          newtab: 'index.html',
          popup: 'popup.html',
        },
      },
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : undefined,
    },
    define: {
      MOCK_CHROME: mode === 'development',
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './.config/vitest.ts',
      include: ['__test__/**/*.test.ts?(x)', 'src/**/*.test.ts?(x)'],
      exclude: ['**/*.d.ts', '*.config.*', './src/lib/**', './src/mock/**', './src/types/**'],
      coverage: {
        include: ['src/**/*.ts?(x)'],
        exclude: ['**/*.d.ts', '*.config.*', './src/lib/**', './src/mock/**', './src/types/**'],
      },
    },
  };
});
