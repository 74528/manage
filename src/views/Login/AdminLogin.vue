<template>
  <div style="padding: 20px">
       <!-- 表单组件，绑定了名为 "admin" 的数据对象 -->
    <el-form :model="admin" label-width="120">
      <!-- 创建一个表单项，并设置其标签为“用户名” -->
      <el-form-item label="用户名">
        <!-- 创建一个输入框，并使用 v-model 指令将其绑定到 "admin" 数据对象的 "username" 属性上 -->
        <el-input v-model="admin.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="admin.password" type="password"></el-input>
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
import axios from 'axios'
import {ref} from 'vue';
/**
 * ref通常用来定义基本类型数据
 * reactive用来定义：对象（或者数组）类型数据
 * ref也可以用来定义对象或者数组类型的数据，内部会通过reactive转为代理对象
 * ref操作数据需要.value，template模板中不需要。
 * reactive都不需要,value
 */

const port='8080';
const serverName= `https://localhost:${port}`;
const adminLoginUrl = '/admin/login/password';

let admin = ref({
  username: '', // 账号
  password: '' // 密码
});

  const login = async () => {
    axios.post('/api' + adminLoginUrl, admin.value, {'withCredentials': true}).then((response) => {
  if (response.data.code===0){
    localStorage.setItem('token', response.data.token)
    // index().setMenu(response.data.data.menu)
    // 测试是否设置成功
    // console.log("index.token=========",index().token)
    //跳转到系统首页
    // router.push({ name: 'home' })
    console.log(response.data);
    router.push({name: 'home'});
  }
  else{
    //  弹窗提示信息
    // ElMessage({
    //   type: 'error',
    //   message: response.data.data.message
    console.log(response.data);
    alert("error")
    
  // })

 }
});
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

