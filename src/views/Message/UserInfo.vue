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
import { ElMessage, messageConfig } from 'element-plus';

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
    // const response = await axios.post('/userInfo/edit', operateForm)
    // console.log('response=====>', response)

    let istatus = operateForm.value.status == '正常' ? 0 : 1;

    await axios.put('/api/user/update', {
        id: operateForm.value.id,
        phoneNumber: operateForm.value.phoneNumber,
        gender: operateForm.value.gender,
        intro: operateForm.value.intro,
        status: istatus
    }).then((resp) => {
        if (resp.data.code === 0) {
            console.log('succes');
        } else {
            console.log('error');
        }
    });

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
  phoneNumber:'',
  gender:'',
  intro:'',
  // avater:'',
  registerTime:'',
  lastLoginTime:'',
  status: 0,
  deleted: 0
})
// form表单的标题
// @ts-ignore
const operateFormLabel = ref([
{
    model: 'id',
    label: '账号',
    type:'text'
  },
  {
    model: 'username',
    label: '昵称',
    type:'text'
  },
  //  {
  //   model: 'avatar',
  //   label: '头像',
  //   type: 'image'
  // },
  {
    model: 'phoneNumber',
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
    model: 'intro',
    label: '个人简介'
  },
  {
    model: 'status',
    label: '状态',
    type: 'select',
    opts: [
      {
        label: '正常',
        value: 0
      },
      {
        label: '封禁',
        value: 1
      }
    ]
  }
])


// 删除
const DelUser = (row) => {
  //打印纸组件发送编辑表格事件的行数据
  console.log('C=======>', row.id),

  // @ts-ignore
  ElMessageBox.confirm('此操作将永久删除该用户,是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      //1. 请求删除接口，根据id删除用户信息
      // @ts-ignore
    
      // @ts-ignore
        axios.delete(`/api/admin/user/delete?id=${row.id}`)
        .then((res) => {
          if (res.data.code === 0) { 
            alert("注销成功！")
            getUserInfoData()
           
          } else {
            alert("注销失败！")
          }
        })
        .catch(() => {
          alert("网络错误请重试")
        })
    })
    .catch(() => {
      alert("已取消删除。")
    })
}


//获取子组件传过来的单个用户信息
const EditUser = (row) => {
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
  {
    prop: 'intro',
    label: '个人简介'
  },

  // {
  //   prop: 'avatar',
  //   label: '头像',
  //   type:"image"
  // },
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

const getUserInfoData = (username) => {
  let number;
  if (typeof config.total === 'object' && typeof config.total.value !== 'undefined') {
    // 如果config.total是对象且有value属性
    number = config.total.value;
   } else if (typeof config.total === 'number') {
    // 如果config.total是数字
    number = config.total;}
      
 
  console.log(config);
  const url = username ? 
     // `http://localhost:8080/admin/user/search?username=${encodeURIComponent(username)}&pageNum=${config.page.value}&pageSize=${number}` :
    //  `http://localhost:8080/admin/user/all?pageNum=${config.page.value}&pageSize=${number}`;
    `/api/admin/user/search?username=${encodeURIComponent(username)}&pageNum=${config.page.value}&pageSize=${number}` :
       `/api/admin/user/all?pageNum=${config.page.value}&pageSize=${number}`;
    axios.get(url, {'withCredentials': true}).then((resp) => {
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
