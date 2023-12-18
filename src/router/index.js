import { createRouter, createWebHistory } from 'vue-router'
// import postInfo from '../mock/postInfo'
// import replyInfo from '../mock/replyInfo'
//静态导入:在模块加载时立即导入并执行。
//        这对于常规的模块导入非常适用，例如导入常驻在应用中的组件。
// import Main from '@/views/Main.vue'
//动态导入:在需要的时候才加载模块，通常用于懒加载路由或按需加载组件。
//        这可以提高应用的性能，因为不会在初始加载时加载所有组件。
const Main = () => import('@/views/Main.vue')
const Home = () => import('@/views/Home/Home.vue')
const UserInfo = () => import('@/views/Lawyer/UserInfo.vue')
// const LawyerReview = () => import('@/views/Lawyer/LawyerReview.vue')
const Login = () => import('@/views/Login/Login.vue')
const PostInfo = () => import('@/views/Lawyer/PostInfo.vue')
const ReplyInfo = () => import('@/views/Lawyer/ReplyInfo.vue')


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main,
      // 配置子路由，他们都是Main的子路由
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
          meta: {
            title: '用户管理',
            requiresAuth: true
          }
        },
        {
          path: '/userInfo',
          name: 'userInfo',
          component: UserInfo
        },
        // {
        //   path: '/lawyerReview',
        //   name: 'lawyerReview',
        //   component: LawyerReview
        // },
        {
          path: '/postInfo',
          name: 'postInfo',
          component: PostInfo
        },
        {
          path: '/replyInfo',
          name: 'replyInfo',
          component: ReplyInfo
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
})
export default router
