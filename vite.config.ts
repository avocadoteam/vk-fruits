import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
      '@core': '/src/core',
      '@ui': '/src/ui',
    },
  },
  plugins: [react(), vanillaExtractPlugin()],
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          return assetInfo.name;
        },
        chunkFileNames: assetInfo => {
          return assetInfo.name + '.js';
        },
        entryFileNames: assetInfo => {
          return assetInfo.name + '.js';
        },
      },
    },
  },
});
