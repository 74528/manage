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
      <el-button type="primary" @click="addPost">+ 新增</el-button>
      <common-form inline :formLabel="formLabel" :form="searchForm">
        <el-button type="primary" @click="getPostInfoData(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>
    <!-- 使用 CommconTable -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @valToParent="hangdleValFromChild"
      @handleEdit="EditPost"
      @handleDel="DelPost"
    ></common-table>
  </div>
</template>

<script lang="ts" setup>
// 导入子组件
// @ts-ignore
import CommonForm from '../../components/CommonForm.vue'
// @ts-ignore
import CommonTable from '../../components/CommonTable.vue'
import axios from 'axios';
// 打开新增帖子窗口
const addPost = () => {
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
    const response = await axios.post('/postInfo/edit', operateForm)
    // console.log('response=====>', response)
  } else {
    // 否则就是新增
    // @ts-ignore
    const response = await axios.post('/postInfo/add', operateForm)
    console.log('response=====>', response)
  }
  //关闭表单弹窗
  isShow.value = false
  //刷新表格数据
  getPostInfoData()
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
  title:'',
  send_time:'',
  reply_count:'',
  maxlevel:'',
  last_reply_time:'',
  category:'',
  sender_id:'',
  status:'',
})
// form表单的标题
// @ts-ignore
const operateFormLabel = ref([
{
    model: 'id',
    label: '标题'
  },
  {
    model: 'title',
    label: '帖名'
  },
  {
    model: 'send_time',
    label: '发表时间',
    type: 'date'
  },
  {
    model: 'reply_count',
    label: '回复数'
  },
   
  {
    model: 'max_level',
    label: '最大楼层数'
  },
  {
    model: 'last_reply_time',
    label: '上次回复时间',
    type: 'date'
  },
   {
    model: 'category',
    label: '分区',
    type: 'select',
    opts: [
      {
        label: '讨论区',
        value: 0
      },
      {
        label: '专业区',
        value: 1
      }
    ]
  },
  {
    model: 'sender_id',
    label: '帖主ID',
  }, 
  {
    model: 'status',
    label: '状态',
    type: 'select',
    opts: [
      {
        label: '可用',
        value: 0
      },
      {
        label: '封禁',
        value: 1
      }
    ]
  },
 
])
// 删除
const DelPost = (row: Object) => {
  //打印纸组件发送编辑表格事件的行数据
  console.log('C=======>', row.id),

  // @ts-ignore
  ElMessageBox.confirm('此操作将删除该帖子,是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      //1. 请求删除接口，根据id删除用户信息
      // @ts-ignore
    
      // @ts-ignore
      axios.delete(`http://localhost:8080/admin/post/delete?id=${row.id}`)
        .then((res) => {
          if (res.data.code === 0) { 
            alert("注销成功！")
            getPostInfoData()
           
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

//获取子组件传过来的单个帖子信息
const EditPost = (row: Object) => {
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
  // 点击其他页数的时候，调用获取帖子信息数据的函数
  getPostInfoData()
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
    label: '帖号'
  },
  {
    prop: 'title',
    label: '标题'
  },
  {
    prop: 'sendTime',
    label: '发表时间'
  },
  {
    prop: 'replyCount',
    label: '回复数'
  },
  {
    prop: 'maxLevel',
    label: '最大楼层数'
  },
  {
    prop: 'lastReplyTime',
    label: '上次回复时间'
  },
  {
    prop: 'category',
    label: '分区'
  },
  {
    prop: 'senderId',
    label: '帖主ID'
  } ,
  {
    prop: 'status',
    label: '状态'
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
//调用帖子测试信息数据
const getPostInfoData = async () => {
  let number;
  if (typeof config.total === 'object' && typeof config.total.value !== 'undefined') {
    // 如果config.total是对象且有value属性
    number = config.total.value;
   } else if (typeof config.total === 'number') {
    // 如果config.total是数字
    number = config.total;}

    axios.get(`http://localhost:8080/admin/post/all?pageNum=${config.page.value}&pageSize=${number}`).then((resp) => {
        if (resp.data.code === 0) {
            console.log('success');
            config.loading = true;
            tableData.value = resp.data.data.map((item) => {
                
                    if (item.status === 0) {
                        item.status = '正常';
                    } else {
                        item.status = '删除';
                    } 
                item.category = item.category === 0 ? '讨论区' : '专业区'
                return item;
            });
            config.total.value = resp.data.data.length;
            config.loading = false;
            // config.count = 
        } else {
            console.log('error');
        }
        console.log(resp.data);
    });
}
// 在组件挂载时调用 getLawyerInfoData
// @ts-ignore
onMounted(getPostInfoData)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/tableform';
</style>
