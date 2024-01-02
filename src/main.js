import { createApp } from 'vue'              // 从 'vue' 包中导入 createApp 方法，用来创建 Vue 应用的。  
import { createPinia } from 'pinia'        // 从 'pinia' 包中导入 createPinia 方法，用来创建 Pinia 状态管理的。  
import { index } from './stores/index'     // 从 './stores/index' 文件中导入 index，应用中的状态管理实例。  
  
import App from './App.vue'                  // 从 './App.vue' 文件中导入 App 组件，应用的入口组件。  
import router from './router'              // 从 './router' 文件中导入 router，应用的路由实例。  
//导入mock  
import './mock'                             // 导入 './mock' 文件，应用的模拟数据或接口。  
  
router.beforeEach((to, from, next) => {      // 在路由改变之前，使用 beforeEach 守卫。  
  let token = localStorage.getItem('token')  // 从 localStorage 中获取名为 'token' 的项。  
  if(localStorage.getItem('menu')){           // 如果 localStorage 中存在名为 'menu' 的项，则执行下面的代码。  
    index().setMenu(JSON.parse(localStorage.getItem('menu'))) 
    // 使用 index() 方法（状态管理实例）并调用 setMenu 方法，将 localStorage 中的 'menu' 项解析为 JSON 并设置为菜单。  
  }  
  // 在控制台打印 token 的值。  
  // console.log("localStorage.getItem('token')======>",localStorage.getItem('token'))  
  
  // 判断是否存在token，和当前页面是否登录页，如果token不存且当前页不是login在则跳转到login页  
  if (!token && to.name !== 'login') {       // 如果 token 不存在且目标页面不是 'login' 页面，则执行下面的代码。  
    next({ name: 'login' })                   // 跳转到 'login' 页面。  
  } else {  
    next()                                    // 否则，继续执行路由。  
  }  
})                                           // 结束 beforeEach 守卫函数。  
  
const app = createApp(App)                  // 使用 createApp 方法创建 Vue 应用，并将 App 组件作为根组件。  
app.use(createPinia())                      // 在应用中使用 Pinia 作为状态管理。  
app.use(router)                            // 在应用中使用 router。  
app.mount('#app')                          // 将 Vue 应用挂载到 id 为 'app' 的 DOM 元素上。

