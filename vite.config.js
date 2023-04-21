import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prismjs from 'vite-plugin-prismjs';
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    prismjs({
      languages: ['json','java'],
    }),
    AutoImport({
      // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
      // {prefix}-{collection}-{icon} 使用组件解析器时，您必须遵循名称转换才能正确推断图标。
      imports: ['vue','vue-router'],
      dts: 'src/auto-import.d.ts',
      resolvers: [ElementPlusResolver(), IconsResolver({prefix: 'Icon',}),],
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      dts: 'src/components.d.ts',
      deep: true,
      resolvers:[ElementPlusResolver(),IconsResolver({enabledCollections: ['ep'],}),],
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  
})
