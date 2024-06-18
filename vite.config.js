// import path from 'path'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import mkcert from 'vite-plugin-mkcert'

const fs = require('fs');
const path = require('path');

//用于创建一个绝对路径，并将其存储在变量 pathSrc 中
// __dirname 是 Node.js 中的一个特殊变量，表示当前脚本所在的目录的绝对路径。
const pathSrc = path.resolve(__dirname, 'src')
export default defineConfig({
  plugins: [
    vue(), //使用 Vue3 插件
    Components({
      resolvers: [
        ElementPlusResolver(), // 自动注册 Element Plus 组件
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'], // 启用 Element Plus 图标集合
        }),
      ],
    }),
    AutoImport({//是一个用于自动导入组件的插件
      imports: [
        'vue', // Vue全部API
        'vue-router', // Vue路由全部API
        {
          'axios':[
            ['default','axios'], // import { default as axios } from 'axios'
          ],
        },
        
      ],
      resolvers: [
        ElementPlusResolver(), // 自动导入 Element Plus 组件
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon', // 图标组件前缀
        }),
      ]
    }),
    Icons({ //这是一个用于管理图标库的插件
      autoInstall: true, //自动安装图标
    }),
    // mkcert()
  ],
  resolve: { //这是配置模块解析的部分
    alias: {
      '@': pathSrc // 别名配置，将 '@' 映射到 pathSrc 变量指定的路径
    }
  },
  server:{
    host:'localhost',//自定义主机名
    port: 3000,//自定义端口
    // https: false,// 是否开启 https
    // https: true,// 是否开启 https
    // https: {
    //     cert: fs.readFileSync(path.join(__dirname, 'src/ssl/cert.crt')),
    //     key: fs.readFileSync(path.join(__dirname, 'src/ssl/cert.key'))
    // },
    open:true,//配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
    proxy: {
        '^/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
            secure: false,
        }
    }
  }
})
