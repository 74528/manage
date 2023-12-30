<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="2"
    text-color="#fff"
    :collapse="isCollapse"
  >
    <div class="logoIndex-img">
      <img :src="logoIndex" />
      <span style="margin: 10px">
        <el-text class="mx-1" type="primary">论坛后台管理</el-text>
      </span>
    </div>
    <!-- 配置没有二级菜单的菜单路由内容-->
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <el-icon>
        <!-- 固定写法 -->
        <!-- <i-ep-HomeFilled/> -->
        <!-- 动态写法 -->
        <component :is="resolveIcon(item.icon)"></component>
      </el-icon>
      <span>{{ item.label }}</span>
    </el-menu-item>
    <!-- 配置有二级菜单的菜单路由内容-->
    <el-sub-menu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
      <template #title>
        <el-icon>
          <!-- 固定写法 -->
          <!-- <i-ep-HomeFilled/> -->
          <!-- 动态写法 -->
          <component :is="resolveIcon(item.icon)"></component>
        </el-icon>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
        >
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
//获取Pinia实例index
import { index } from '../stores/index'
// @ts-ignore  这里去掉会报ts语法检查错误
import logoIndex from '@/assets/logo.png'
import { ref, computed } from 'vue'
//引用路由对象
import router from '../router/index.js'
//转义icon
const resolveIcon = (icon) => {
  switch (icon.name) {
    case 'ep-home-filled': //首页icon
      return IconEpHomeFilled
    case 'ep-user-filled': //律师管理icon
      return IconEpUserFilled
    case 'ep-histogram':  //统计报表icon
      return IconEpHistogram
    case 'ep-tools':  //系统管理icon
      return IconEpTools
    default:
      return IconEpMenu // 默认图标
  }
}

//Vue 3 中的 computed 函数来创建一个计算属性 noChildren。
// 获取菜单对象中不包含子级的菜单
 const noChildren = computed(() => asideMenu.value.filter((item) => !item.children))
// const noChildren = computed(() => index().menuInfo.filter((item) => !item.children))
// 获取菜单对象中包含子级的菜单
const hasChildren = computed(() => asideMenu.value.filter((item) => item.children))

const isCollapse = ref(computed(() => index().isCollapse))
//clickMenu方法获取用户点击左侧导航栏的item状态
const clickMenu = (key) => {
  // console.log(key)//{path: '/', name: 'home', label: '首页'}
  // @ts-ignore  这里去掉会报ts语法检查错误
  // console.log(key.name)//{path: '/', name: 'home', label: '首页'}
  //利用index实例调用selectMenu函数，并传递参数进去，用于存储获取的菜单信息
  index().selectMenu(key)
  //点击导航栏，触发路由跳转到对应路由的页面组件。
  // @ts-ignore
  router.push({ path: key.path })
}
/**
 * icon: IconEpHomeFilled
 *  a. 在 Vue3 中，component 动态组件的 is 属性必须绑定的是组件实例，
      而不是组件名字，所以需要去掉双引号。
    b. 在 vite.config.js 中配置了图标前缀 Icon 和图标库集合 ep，
      所以在写图标名称是需要加上前缀，并且使用驼峰命名。
 */
// @ts-ignore
// 创建一个可响应的数组
const asideMenu = ref([
  {
    path: '/',
    name: 'home',
    label: '首页',
    icon: IconEpHomeFilled
  },
  // 设置子级菜单路由
  {
    label: '用户管理',
    icon: IconEpUserFilled,
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        label: '用户信息'
      },
      {
        path: '/reportInfo',
        name: 'reportInfo',
        label: '举报审核'
      }
    ]
  },
  {
    label: '信息管理',
    icon: IconEpHistogram,
    children: [
      {
        path: '/postInfo',
        name: 'postInfo',
        label: '帖子管理'
      },
      {
        path: '/replyInfo',
        name: 'replyInfo',
        label: '回复管理'
      }
    ]
  },
  {
    label: '系统管理',
    icon: IconEpTools,
    children: [
      {
        path: '/analyseInfo',
        name: 'analyseInfo',
        label: '数据统计'
      },
      {
        path: '/systemLog',
        name: 'systemLog',
        label: '系统日志'
      }
    ]
  }
])
</script>
<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
}
// 设置头像
.logoIndex-img {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  img {
    width: 40px;
    height: 30px;
    border-radius: 10px;
  }
}
</style>
