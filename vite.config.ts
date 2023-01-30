import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VitePWA from 'vite-plugin-pwa'
import Icons from 'unplugin-icons/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Icons({ compiler: 'vue3' }),
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        'vue-i18n',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/stores'],
    }),
    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),
    /**
     * VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),
     */
  ],
})
