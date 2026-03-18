import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // 读取 .env 文件里的变量
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],

    // 路径别名配置
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      // 允许外部访问容器内的 Vite 服务
      host: '0.0.0.0',

      // 前端端口，默认 9001
      port: Number(env.VITE_PORT || 9001),

      // 开发代理配置
      proxy: {
        '/api': {
          // 代理到后端容器
          target: env.VITE_API_TARGET || 'http://simnotice-backend:9501',
          changeOrigin: true,
        },
      },
    },
  }
})
