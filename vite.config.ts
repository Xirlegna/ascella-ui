import { defineConfig } from 'vite';
import { extname, relative, resolve } from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ascella-ui',
      formats: ['es'],
      fileName: 'ascella-ui',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx}')
          .map((file) => [
            relative('src', file.slice(0, file.length - extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
