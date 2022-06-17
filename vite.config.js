import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default (config) => {
  return defineConfig({
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'honeybadger-vue3-composition-api',
      },
      rollupOptions: {
        output: {
          exports: 'named',
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [vue()]
  })
}