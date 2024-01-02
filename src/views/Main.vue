<template>
  <!-- 构建一个具有侧边栏、头部、主内容区域和路由动态内容的页面布局 -->
  <el-container style="height: 100%">
    <!-- 使用aside子组件 -->
    <el-aside width="auto"><CommonAside></CommonAside></el-aside>
    <el-container>
      <!-- 使用header子组件 -->
      <el-header><CommonHeader></CommonHeader></el-header>
      <!-- 使用CommontTab组件 -->
      <CommonTab></CommonTab>
      <el-main>
        <!-- 业务层路由展示<router-view> 
          是 Vue Router 的核心组件之一，
          用于渲染匹配到的路由组件。
          它允许你在单页应用中动态加载不同的组件，以响应用户的路由导航。
          动态地渲染对应的组件，从而实现了单页应用的动态内容加载
         -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入子组件
import CommonHeader from '../components/CommonHeader.vue'
import CommonAside from '../components/CommonAside.vue'
// @ts-ignore
import CommonTab from '../components/CommonTab.vue'
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #333;
}
.collapes-menu {
  width: 65px !important;
  transition: 0.5s !important;
}
.el-main{
  padding-top:0
}
</style>

