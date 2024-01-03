<!-- 展示标签页导航。 -->
<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="tag in state.tags"
      :key="tag.name"
      class="mx-1"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="changeMenu(tag)"
      :effect="route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>
<script setup>
import { nextTick, ref } from 'vue'
import { index } from '../stores/index'
//引用路由对象
import router from '../router/index.js'
/**
 * 要在Vue3的<script setup>中获取路由信息，
 * 可使用 vue-router 提供的 useRoute 函数。
 * const route = useRoute()
 * 但是注意不能写在changeMenu中
 * 因为写在内部route就是局部变量，只能在changeMenu函数内部使用，
 * 所以console.log(route) 会输出undefined,因为在函数外部，route不再存在
 */
// @ts-ignore
const route = useRoute()
// Tag标签与业务组件路由跳转连通
const changeMenu = (tag) => {
  // @ts-ignore
  router.push({ name: tag.name })
  // const route = useRoute()  //如果写在这里，下面会输出undefined
  // console.log(route)//undefined
}
// @ts-ignore  这里去掉会报ts语法检查错误
const state = reactive({
  // @ts-ignore  这里去掉会报ts语法检查错误
  tags: computed(() => index().tabsList)
})

const dynamicTags = ref(['标签一', '标签二', '标签三'])
// 关闭当前标签
const handleClose = (tag) => {
  // dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  // console.log('tag===', tag.name)
  // console.log('route.name', route.name)
  index().closeTab(tag.name)
  //如果关闭的是当前路由标签
  if (route.name === tag.name) {
    //  console.log("index().tabsList=====",index().tabsList)
    //如果这个标签不是最后一个，就回退
    if (index().tabsList.length != 1) {
      router.go(-1)
    }else{//否则回到首页
     router.push({ path: "/" }) 
    }
  }
}
</script>
<style lang="scss" scoped>
// 设置tag标签样式
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    //添加一个小手效果
    cursor: pointer;
  }
}
</style>