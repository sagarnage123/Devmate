import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root:".",
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // <-- Replace 5000 with your backend port if different
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
