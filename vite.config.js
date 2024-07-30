import { fileURLToPath, URL } from 'node:url'

import { defineConfig ,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command,mode})=>{
  const env=loadEnv(mode,process.cwd())
  console.log(env)
  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server:{
      proxy:{
        '/api':{
          target:env.VITE_BASE_URL,
          changeOrigin:true,
          rewrite:path=>{
            console.log(path)
            return path.replace(/^\/api/,"")
          }
        },
        '/map':{
          target:env.VITE_BASE_MAP,
          changeOrigin:true,
          rewrite:path=>{
            return path.replace(/^\/map/,"")
          }
        }
      }
    }
  }
})
