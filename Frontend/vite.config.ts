import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const backendUrl = process.env.VITE_API_PROXY_TARGET || 'http://localhost:5167';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    // host true exposes the dev server on the LAN so a phone on the same Wi-Fi can use it.
    host: true,
    port: 5173,
    proxy: {
      '/api': backendUrl,
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
});

