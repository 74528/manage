<template>
  <!-- 创建了一个具有两种类型的菜单项（有或没有二级菜单）的导航菜单。每个菜单项都有一个图标、标签文本和一个点击事件处理程序 -->
  <!-- 菜单项配置 -->
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="2"
    text-color="#fff"
    :collapse="isCollapse"
  >
  <!-- 菜单上方： Logo 和标题 -->
    <div class="logoIndex-img">
      <img :src="logoIndex" />
      <span style="margin: 10px">
        <el-text class="mx-1" type="primary">论坛后台管理</el-text>
      </span>
    </div>
    <!-- 配置没有二级菜单的菜单路由内容-->
    <!-- 每个菜单项都有一个与其路径相关的索引。 -->
    <!-- 通过 v-for 指令循环遍历 noChildren 数组，并为每个项目创建一个菜单项 -->
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
    <!-- 每个菜单项都有一个图标、标签文本和一个点击事件处理程序。 -->
      <el-icon>
        <!-- 固定写法 -->
        <!-- <i-ep-HomeFilled/> -->
        <!-- 动态写法 -->
        <component :is="resolveIcon(item.icon)"></component>
      </el-icon>
      <span>{{ item.label }}</span>
    </el-menu-item>
    <!-- 配置有二级菜单的菜单路由内容-->
    <!-- 创建具有子菜单的菜单项。
      使用 v-for 指令循环遍历 hasChildren 数组。
      每个子菜单都有一个标题，标题下方是子菜单项的集合。
      子菜单项通过 <el-menu-item-group> 组件进行分组，并使用 <el-menu-item> 组件进行渲染。也有一个点击事件处理程序 -->
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
    case 'ep-user-filled': //icon
      return IconEpUserFilled
    case 'ep-histogram':  //icon
      return IconEpHistogram
    case 'ep-tools':  //icon
      return IconEpTools
    default:
      return IconEpMenu // 默认图标
  }
}
//处理导航菜单的逻辑
//Vue 3 中的 computed 函数来创建一个计算属性 noChildren。
// 获取菜单对象中不包含子级的菜单
 const noChildren = computed(() => asideMenu.value.filter((item) => !item.children))
// const noChildren = computed(() => index().menuInfo.filter((item) => !item.children))
// 获取菜单对象中包含子级的菜单
const hasChildren = computed(() => asideMenu.value.filter((item) => item.children))
// index().isCollapse 的值发生变化，isCollapse 引用的值也会相应地更新，从而触发任何依赖于它的组件或代码段的重新渲染
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
