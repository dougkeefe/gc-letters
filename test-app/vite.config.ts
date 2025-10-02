import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // When developing, import from source
      // When testing the package, comment this out and install via npm
      'gc-letters': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  optimizeDeps: {
    // Prevent vite from pre-bundling these during development
    exclude: ['gc-letters'],
  },
});
