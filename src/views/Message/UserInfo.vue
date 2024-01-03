<template>
  <div class="manage">
    <!-- 编辑表格弹窗
          - :title 弹窗名称根据传入的类型显示不同名称 -->
    <el-dialog :title="operateType === 'add' ? '新增' : '更新'" v-model="isShow">
      <!-- 使用公共表单组件 -->
      <common-form :formLabel="operateFormLabel" :form="operateForm"></common-form>
      <!-- 弹窗添加操作按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>

    <div class="manage-header">
      <!-- 使用 CommonForm  -->
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchForm">
        <!-- <el-button type="primary" @click="getUserInfoData(searchForm.keyword)">搜索</el-button> -->
        <el-button type="primary" @click="getUserInfoData(searchForm.keyword)">搜索</el-button>
     
      </common-form>
    </div>
    <!-- 使用 CommconTable -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @valToParent="hangdleValFromChild"
      @handleEdit="EditUser"
      @handleDel="DelUser"
    ></common-table>
  </div>
</template>

<script lang="ts" setup>
// 导入子组件
// @ts-ignore

import CommonForm from '../../components/CommonForm.vue'
// @ts-ignore
import CommonTable from '../../components/CommonTable.vue'

import {ref} from 'vue'
import axios from 'axios';
import { response } from 'express';
import { messageConfig } from 'element-plus';

// 打开新增用户窗口
const addUser = () => {
  operateForm.value = {} //清空表单
  operateType.value = 'add' // 修改弹窗标题
  isShow.value = true // 设置窗口显示
}

//表格点击确定按钮发送ajax请求到mock
const confirm = async () => {
  // console.log('operateForm====', operateForm)
  if (operateType.value === 'edit') {
    // 如果操作类型是修改
    // @ts-ignore
    const response = await axios.post('/userInfo/edit', operateForm)
    // console.log('response=====>', response)
  } else {
    // 否则就是新增
    // @ts-ignore
    const response = await axios.post('/userInfo/add', operateForm)
    console.log('response=====>', response)
  }
  //关闭表单弹窗
  isShow.value = false
  //刷新表格数据
  getUserInfoData()
}
// 弹窗类型 默认是新增（add）
// @ts-ignore
const operateType = ref('add')
// 弹窗默认不显示
// @ts-ignore
const isShow = ref(false)
// 编辑表格内容的form表单数据
// @ts-ignore
const operateForm = ref({
  // 更新表格字段名字
  id:'',
  username:'',
  password:'',
  phone_number:'',
  gender:'',
  intro:'',
  avater:'',
  registerTime:'',
  last_login_time:'',
  status:'',
  deleted:''
})
// form表单的标题
// @ts-ignore
const operateFormLabel = ref([
{
    model: 'id',
    label: '账号'
  },
  {
    model: 'username',
    label: '昵称'
  },
   {
    model: 'avatar',
    label: '头像',
    type: 'image'
  },
  {
    model: 'phone_number',
    label: '手机号'
  },
  
  {
    model: 'gender',
    label: '性别',
    type: 'select',
    opts: [
      {
        label: '男',
        value: '男'
      },
      {
        label: '女',
        value: '女'
      }
    ]
  },
  {
    model: 'status',
    label: '状态',
    type: 'select',
    opts: [
      {
        label: '正常',
        value: '0'
      },
      {
        label: '封禁',
        value: '1'
      }
    ]
  }
])




// const searchUserInfoData = async (username) => {
//   try {
//     const response = await axios.get(`http://localhost:8080/admin/user/search?username=${encodeURIComponent(username)}&pageNum=${config.page.value}&pageSize=${config.total.value}`);

//     if (response.data.code === 0) {
//       console.log('success');
//       config.loading = true;
//       tableData.value = response.data.data.filter((item) => item.username === username);
//       // 如果需要，针对搜索结果更新搜索相关的分页计数器
//       config.total.value = tableData.value.length;
//       config.loading = false;
//     } else {
//       console.error('Server error:', response.data.message || 'Unknown error');
//       throw new Error(response.data.message || 'Unknown error');
//     }
//   } catch (error) {
//     console.error('An error occurred:', error);
//     // 可能的恢复操作，如重新加载、提示用户等
//     // ...
//     return Promise.reject(error);
//   }
// };

// 删除
// const DelUser = (row: Object) => {
//   //打印纸组件发送编辑表格事件的行数据
//   // console.log('row=======>', row)
//   // @ts-ignore
//   ElMessageBox.confirm('此操作将永久删除该用户,是否继续?', '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning'
//   })
//     .then(() => {
//       //1. 请求删除接口，根据id删除用户信息
//       // @ts-ignore
//       let id = row.id
//       // @ts-ignore
//       axios
//         .get('/userInfo/del', {
//           params: { id }
//         })
//         .then((res) => {
          
//           // console.log(res.data)//{code: 200, message: '删除成功'}
//           // @ts-ignore
//           ElMessage({
//             type: 'success',
//             message: '删除成功'
//           })
//           getUserInfoData()
//         })
//     })
//     .catch(() => {
//       // @ts-ignore
//       ElMessage({
//         type: 'info',
//         message: '删除失败'
//       })
//     })
// }

//获取子组件传过来的单个用户信息
const EditUser = (row: Object) => {
  //打印纸组件发送编辑表格事件的行数据
  // console.log('row=======>', row)
  operateType.value = 'edit'
  // 显示弹窗
  isShow.value = true
  // 把从子组件获取的数据赋值给opreateForm
  operateForm.value = row
}

//获取子组件传过来的val
const hangdleValFromChild = (val: number) => {
  // console.log("val------->",val)//这里可以查看是否获取子组件的值
  config.page = val
  // 点击其他页数的时候，调用获取用户信息数据的函数
  getUserInfoData()
}

// @ts-ignore
const tableData = ref([]) // table表格数据
// @ts-ignore
// table表格列名
const tableLabel = ref([
  {
     // prop属性对应兑现中的键名，即可填入数据
     prop: 'id',
    // 表格列名
    label: 'id'
  },
  {
    // prop属性对应兑现中的键名，即可填入数据
    prop: 'username',
    // 表格列名
    label: '昵称'
  },

  {
    prop: 'phoneNumber',
    label: '手机号'
  },
  {
    prop: 'gender',
    label: '性别'
  },
  // {
  //   prop: 'intro',
  //   label: '信息'
  // },
  {
    prop: 'avatar',
    label: '头像',
    type:"image"
  },
  {
    prop: 'registerTime',
    label: '注册时间'
  },
  {
    prop: 'lastLoginTime',
    label: '上次登录时间'
  },
  {
    prop: 'status',
    label: '用户状态'
  }

])
/**
   * 表格配置信息
   * ref() 用于创建新的响应式数据。
		 toRef 用于引用已存在的响应式数据的属性，将属性转化为 ref 对象。
		 两者的主要区别在于 ref() 创建一个包含数据的 ref 对象，
		 而 toRef 创建一个引用已存在的数据的 ref 对象。
   */
// @ts-ignore
const config = toRefs({
  loading: false,
  page: 1,
  total: 30
})
// 搜索条件
// @ts-ignore
const searchForm = ref({
  keyword: ''
})
// @ts-ignore
const formLabel = ref([
  {
    model: 'keyword',
    label: ''
  }
])
// 注册子组件
const components = {
  CommonForm
}
//调用用户测试信息数据

// const port = '8080';  
// const serverName = `http://localhost:${port}`;  
// const getUserInfoUrl = '/admin/user/all';  
// let all = ref({  
//   pageNum: '',  
//   pageSize: ''  
// });  
  
// const getUserInfoData = async () => {     
//     axios.get(serverName + getUserInfoUrl+'?pageNum=' +1+'&pageSize=20').then((response)=>{
  
//     if (response.data.code === 0) {  
//       // 处理成功的情况  
//       console.log('成功获取用户信息');  
//       console.log('总记录数:', response.data.total);  
//       console.log('用户信息:', response.data.userInfo);  
//       // 在这里你可以将用户信息存储到Vuex存储器或其他地方，以便在组件中使用  
//     } else {  
//       // 处理错误的情况  
//       console.error('获取用户信息失败');  
//       console.error('错误代码:', response.data.code);  
//       console.error('错误信息:', response.data.message);  
//       // 在这里你可以显示错误消息给用户或执行其他操作来处理错误  
//     }  
   
// });
// }

// const getUserInfoData = async (username="") => {
//   try {
//     //vue3中函数获取ref({})中的数据
//     config.loading = true
//     // @ts-ignore
//     const response = await axios.get('/userInfo/getUserInfoData', {
//       params: { page: config.page.value,username }
//     })
//     // @ts-ignore
//     //在 Vue 3 中，如果你使用 ref 来定义一个响应式变量，
//     //通过 .value 属性来访问和修改它的值。
//     //asideMenu.value.filter((item) => item.children)
//     //.map((item) => { ... }) 是 JavaScript 中的数组方法，它遍历 UserInfo 数组中的每个元素，并为每个元素执行指定的操作。
//         tableData.value = response.data.userInfo.map((item) => {  
//       item.gender = item.gender === '男' ? '女' : '男'; // 确保性别是 '女' 或 '男'  
//       item.status = item.status === '可用' ? '封禁' : '可用'; // 确保状态是 '可用' 或 '封禁'  
//       return item;  
//     })  
//     // 总记录数
//     config.total = response.data.count
//     //设置分页数量，每页显示20条100条就是5页
//     config.count = response.data.userInfo.length
//     config.loading = false
//   } catch (error) {
//     console.error(error)
//   }
// } 

const getUserInfoData = (username) => {
  console.log(config);
  const url = username ? 
      `http://localhost:8080/admin/user/search?username=${encodeURIComponent(username)}&pageNum=${config.page.value}&pageSize=${config.total}` :
      `http://localhost:8080/admin/user/all?pageNum=${config.page.value}&pageSize=${config.total.value}`;
    axios.get(url).then((resp) => {
        if (resp.data.code === 0) {
            console.log('success');
            config.loading = true;
            tableData.value = resp.data.data.map((item) => {
                // item.status = item.deleted === 0 ? '正常' : '注销';
                // item.status = item.status === 0 ? '正常' : '禁言';
                if (item.deleted === 0) {
                    if (item.status === 0) {
                        item.status = '正常';
                    } else {
                        item.status = '禁言';
                    }
                } else {
                    item.status = '注销';
                }
                
                return item;
            });
            config.total = resp.data.data.length;
            config.loading = false;
            // config.count = 
        } else {
            console.log('error');
        }
        console.log(resp.data);
    });
}

// 在组件挂载时调用 getUserInfoData
// @ts-ignore
onMounted(getUserInfoData)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/tableform';
</style>
