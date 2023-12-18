<template>
  <div style="padding: 20px">
    <el-form :model="form" label-width="120">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
//获取Pinia实例index
import { index } from '../../stores/index'
import router from '../../router/index.js'

/**
 * ref通常用来定义基本类型数据
 * reactive用来定义：对象（或者数组）类型数据
 * ref也可以用来定义对象或者数组类型的数据，内部会通过reactive转为代理对象
 * ref操作数据需要.value，template模板中不需要。
 * reactive都不需要,value
 */
const form = reactive({
  username: '', // 账号
  password: '' // 密码
})
//登录函数
const login = async () => {
  const response = await axios.post('/permission/getMenu', form)
  if (response.data.code === 200) {
    localStorage.setItem('token', response.data.token)
    index().setMenu(response.data.data.menu)
    // 测试是否设置成功
    // console.log("index.token=========",index().token)
    //跳转到系统首页
    router.push({ name: 'home' })

  } else {
    //弹窗提示信息
    ElMessage({
      type: 'error',
      message: response.data.data.message
    })
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 50%;
  margin: auto;
  padding: 45px;
  height: 450px;
  background-color: #fff;
}
</style>

