import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * WHY: This configuration initializes the Vue plugin and sets up the development server.
 *
 */
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173, // Standard Vite port
    proxy: {
      /**
       * REASONING: Redirects API calls starting with /api to our Node.js server.
       * This prevents CORS issues during development.
       */
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
});