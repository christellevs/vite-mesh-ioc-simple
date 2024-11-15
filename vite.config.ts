import path from 'path';
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
    root: path.resolve(__dirname, 'src'),
	plugins: [vue()],
    build: {
        rollupOptions: {
            input: path.resolve(__dirname, 'src/index.html'),
        },
    },
})
