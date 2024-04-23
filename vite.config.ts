import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      src: '/src',
      '@core': '/src/core',
      '@ui': '/src/ui',
    },
  },
  plugins: mode === 'staging' ? [react(), viteSingleFile(), vanillaExtractPlugin()] : [react(), vanillaExtractPlugin()],
  build: {
    target: 'es2015',
  },
}));
