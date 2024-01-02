<template>
  <header>
    <!-- 左边部分 -->
    <div class="l-content">
      <!--回弹按钮-->
      <el-icon class="iconbutton" :size="25" @click="toggerCollapse">
        <i-ep-Fold v-if="!state.isCollapse" />
        <i-ep-Expand v-else />
      </el-icon>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="state.menuInfo.path" v-if="state.menuInfo">
          <a :href="state.menuInfo.path">{{ state.menuInfo.label }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右边部分 -->
    <el-row class="block-col-2">
      <el-col :span="25">
        <span style="color: white; margin: 20px">管理员</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="user-img">
              <!-- 使用 require 函数引入图片，@ 符号代表项目的根目录 -->
              <img :src="userAvatar" />
            </div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Avatar">个人信息</el-dropdown-item>
              <el-dropdown-item :icon="CircleClose" @click="logOut"> 退出 </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </header>
</template>
<script setup lang="ts">
// @ts-ignore  这里去掉会报ts语法检查错误
// 如果您不使用TypeScript或不需要类型检查，您可以在导入时禁用类型检查
import userAvatar from '@/assets/userinfo.jpg'
import { index } from '../stores/index'
// 用户登出
const logOut = () => {
  //清除token和菜单路由
  index().clearMenu()
  localStorage.removeItem('token')
  // 刷新浏览器
  location.reload()
}

// 切换菜单收缩
const toggerCollapse = () => {
  // @ts-ignore  这里去掉会报ts语法检查错误
  index().triggerIsCollapse()
}
/**
 * 什么是reactive?
    reactive是Vue3中提供实现响应式数据的方法.
    在Vue2中响应式数据是通过defineProperty来实现的.
    而在Vue3响应式数据是通过ES6的Proxy来实现的
  reactive注意点
    reactive参数必须是对象(json/arr)
 */
// @ts-ignore  这里去掉会报ts语法检查错误
const state = reactive({
  // @ts-ignore  这里去掉会报ts语法检查错误
  menuInfo: computed(() => index().menuInfo),
  // @ts-ignore  这里去掉会报ts语法检查错误
  isCollapse: computed(() => index().isCollapse)
})
</script>
<style lang="scss" scoped>
// 设置header为弹性容器
header {
  display: flex;
  // 设置弹性容器中元素水平方向居中
  align-items: center;
  height: 100%;
  // 设置元素两端对齐
  justify-content: space-between;
}
// 设置l-content为弹性容器
.l-content {
  // 设置弹性容器中元素水平方向居中
  display: flex;
  align-items: center;
  // 设置button按钮外右间距
  .iconbutton {
    margin-right: 10px;
    color: white;
  }
}
// 设置头像
.user-img {
  width: 44px;
  height: 44px;
  border-radius: 50px;
  border: 2px var(--el-color-primary) solid;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }
}
</style>
<style lang="scss">
// 浏览器F12查看面包屑内容CSS样式 并cv 选择器
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  color: #fff;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner a {
  color: #fff;
}
</style>