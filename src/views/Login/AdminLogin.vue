<template>
  <div style="padding: 20px">
    <el-form :model="admin" label-width="120">
      <el-form-item label="用户名">
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

// const port='8080';
// const serverName= `http://localhost:${port}`;
// const adminLoginUrl = '/admin/login/password';

// let admin = ref({
//   username: '', // 账号
//   password: '' // 密码
// });


//   const login = async () => {
//     axios.post(serverName + adminLoginUrl, admin.value).then((response) => {
//   if (response.data.code===0){
//     localStorage.setItem('token', response.data.token)
//     // index().setMenu(response.data.data.menu)
//     // 测试是否设置成功
//     // console.log("index.token=========",index().token)
//     //跳转到系统首页
//     // router.push({ name: 'home' })
//     console.log(response.data);
//     router.push({name: 'home'});
//   }
//   else{
//     //  弹窗提示信息
//     // ElMessage({
//     //   type: 'error',
//     //   message: response.data.data.message
//     console.log(response.data);
//     alert("error")
    
//   // })

//  }
// });
//   }

const admin = reactive({
  username: '', // 账号
  password: '' // 密码
})
//登录函数
// 定义一个名为login的异步函数  
const login = async () => { 
  // 使用axios发送一个POST请求到'/permission/getMenu'路径，并等待响应。 
  const response = await axios.post('/permission/getMenu', admin); 
  // 检查响应中的数据中的'code'字段是否为200，通常200表示请求成功。  
  if (response.data.code === 200) { 
    // 将响应中的'token'字段存储在localStorage中，键名为'token'。 
    localStorage.setItem('token', response.data.token);  
  // 调用index函数，并传递一个参数给它的setMenu方法，这个参数是响应中的'data.menu'字段。  
    index().setMenu(response.data.data.menu); 
    // 从index函数的token属性中获取值并打印出来。  
    // console.log("index.token=========",index().token)  
    // 跳转到系统首页
    router.push({ name: 'home' })  
  // 如果上面的条件不满足（即响应的code不是200）  
  } else { 
    // 这是一条ESLint规则的禁用指令，意味着下面的代码不会因为未定义的变量而被警告
    // 弹出一个错误消息，这个消息的内容来自响应中的'data.message'字段。ElMessage是一个可能是Element UI库中的函数，用于显示消息。  
    //  eslint-disable-next-line no-undef 
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

