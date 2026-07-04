import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '../wwwroot'),
    emptyOutDir: false, // Protect free.xlsx template in wwwroot
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});