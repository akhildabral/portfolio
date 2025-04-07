import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/', // Remove /portfolio/ base for Netlify deployment
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    host: true,
    strictPort: true,
    port: 5173
  },
  preview: {
    host: true,
    port: 5173
  }
});