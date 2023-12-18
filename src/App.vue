<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style lang="scss">
#app {
  /* “100vh”是指大小为“100”单位为“vh”的一个相对长度值；
  “vh”是css中的一个相对长度单位，是相对于视窗的高度，
  “100vh”就是指元素的高度等于当前浏览器的视窗高度，
  即浏览器内部的可视区域的高度大小。 */
  height: 100vh;
}
</style>
