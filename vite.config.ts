import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    babel({ include: /\/src\/.*\.tsx?$/, plugins: ['babel-plugin-react-compiler'] }),
  ],
})
