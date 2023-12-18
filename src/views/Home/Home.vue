<template>
  <div class="">首页</div>
</template>

<script lang="ts" setup>
// vue3写法
//async 表示该函数是一个异步函数。
const getUserInfoData = async () => {
  // console.log(123)
  try {
   
    /**
     * await只能在异步函数内部使用,如果去掉async则await报错
     * await 用于等待一个异步操作的完成，并在操作完成后获取其结果。
     * 当程序执行到 await 时，它会暂停函数的执行，直到异步操作完成，
     * 然后继续执行后续代码。
     * await 后面通常跟随一个返回 Promise 对象的表达式，例如异步请求。
     */ 
    // @ts-ignore
    const response = await axios.get('/home/getData')
    // console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
// 在组件挂载时调用 fetchData
// @ts-ignore
onMounted(getUserInfoData)
/**
 * //vue2写法
export default {
  // 调用mock下index的/home/getData接口
  mounted() {
    axios
      .get('/home/getData')
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
} */
</script>
<style lang="scss" scoped></style>
