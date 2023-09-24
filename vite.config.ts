import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copy } from 'vite-plugin-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [{ src: 'images', dest: 'dist/images' }],
      verbose: true, // Optional: Display copied files in the console
    }),
  ],
});