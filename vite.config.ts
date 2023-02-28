import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
// const name = import.meta.ENV.VITE_APP_TITLE
const srcPath = resolve(__dirname, 'src')
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(env)
  return defineConfig({
    plugins: [vue()],
    server: {
      host: '0.0.0.0',
      port: env.VITE_PORT ? env.VITE_PORT as number : 80,
      open: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        // 跨域配置
        "/api": {
          target: `http://localhost:3000/`,
          // target: `http://127.0.0.1:8082/`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },

    },
    build: {
      minify: 'terser', // 更新了 esbulid 如果使用 build 一定要加上这句
      terserOptions: {
        compress: {
          // 生产环境移除 console
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    resolve: {
      alias: {
        '@': srcPath,
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    base: '/',
  })

}