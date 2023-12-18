import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { index } from './stores/index'


import App from './App.vue'
import router from './router'
//导入mock
import './mock'

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if(localStorage.getItem('menu')){
    index().setMenu(JSON.parse(localStorage.getItem('menu')))
  }
  // console.log("localStorage.getItem('token')======>",localStorage.getItem('token'))
  // 判断是否存在token，和当前页面是否登录页，如果token不存且当前页不是login在则跳转到login页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})



const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')


