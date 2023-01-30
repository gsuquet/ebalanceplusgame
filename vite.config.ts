import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VitePWA from 'vite-plugin-pwa'
import Icons from 'unplugin-icons/vite' //<--My change for iconify

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Icons({ compiler: 'vue3' }),  //<--My change for iconify
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    })
  ],
})
