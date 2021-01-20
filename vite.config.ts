import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: [
      'rxjs/operators',
    ]
  },
  build: {
    rollupOptions: {
      output: [
        // legacy (ES5) bundles:
        {
          format: 'amd',
          entryFileNames: '[name].legacy.js',
          chunkFileNames: '[name]-[hash].legacy.js',
          plugins: [
            getBabelOutputPlugin({
              allowAllFormats: true,
              presets: ['@babel/preset-env']
            })
          ]
        },
        // modern bundles:
        {
          format: 'es',
          plugins: [
            getBabelOutputPlugin({
              allowAllFormats: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: { esmodules: true },
                    bugfixes: true,
                    loose: true
                  }
                ]
              ]
            })
          ]
        },
      ]
    }
  }
})
