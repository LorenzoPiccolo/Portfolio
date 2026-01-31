// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        works: resolve(__dirname, 'works.html'),
        'case-history': resolve(__dirname, 'case-history.html'),
        // Project pages
        'build-zero': resolve(__dirname, 'build-zero.html'),
        'portfolio-website': resolve(__dirname, 'portfolio-website.html'),
        'alidays': resolve(__dirname, 'alidays.html'),
        'redi-website': resolve(__dirname, 'redi-website.html'),
        'romaji': resolve(__dirname, 'romaji.html'),
        'atalus': resolve(__dirname, 'atalus.html'),
        'reborn': resolve(__dirname, 'reborn.html'),
      },
    },
  },
});
