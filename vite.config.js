// vite.config.js
// Vite configuration with Tailwind CSS v4 plugin integration
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Official Tailwind v4 Vite plugin — no postcss config needed
  ],
});
