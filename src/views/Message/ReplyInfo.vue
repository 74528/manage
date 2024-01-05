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
        <el-button type="primary" @click="addReply">+ 新增</el-button>
        <common-form inline :formLabel="formLabel" :form="searchForm">
          <el-button type="primary" @click="getReplyInfoData(searchForm.keyword)">搜索</el-button>
        </common-form>
      </div>
      <!-- 使用 CommconTable -->
      <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @valToParent="hangdleValFromChild"
        @handleEdit="Editreply"
        @handleDel="DelReply"
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
  // 打开新增回复窗口
  const addReply = () => {
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
      const response = await axios.reply('/replyInfo/edit', operateForm)
      // console.log('response=====>', response)
    } else {
      // 否则就是新增
      // @ts-ignore
      const response = await axios.reply('/replyInfo/add', operateForm)
      console.log('response=====>', response)
    }
    //关闭表单弹窗
    isShow.value = false
    //刷新表格数据
    getReplyInfoData()
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
 content:'',
 like_count:'',
 dislike_count:'',
 reply_to:'',
 send_time:'',
 sender_id:'',
 floor_id:'',
 status:''
  })
  // form表单的标题
  // @ts-ignore
  const operateFormLabel = ref([
  {  
    model: 'id',  
    label: 'ID'  
  },  
  {  
    model: 'content',  
    label: '内容'  
  },  
  {  
    model: 'like_count',  
    label: '点赞数'  
  },  
  {  
    model: 'dislike_count',  
    label: '不喜欢数'  
  },  
  {  
    model: 'reply_to',  
    label: '回复至'  
  },  
  {  
    model: 'send_time',  
    label: '发送时间',  
    type: 'date'  
  },  
  {  
    model: 'sender_id',  
    label: '发送者ID'  
  },  
  {  
    model: 'floor_id',  
    label: '楼层ID'  
  },  
  {
    model: 'status',
    label: '状态',
    type: 'select',
    opts: [
      {
        label: '正常',
        value: 'true'
      },
      {
        label: '封禁',
        value: 'false'
      }
    ]
  } 
   
  ])
  // 删除
  const DelReply = (row: Object) => {
    //打印纸组件发送编辑表格事件的行数据
    // console.log('row=======>', row)
    // @ts-ignore
    ElMessageBox.confirm('此操作将永久删除该用户,是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        //1. 请求删除接口，根据id删除回复信息
        // @ts-ignore
        let id = row.id
        // @ts-ignore
        axios
          .get('/replyInfo/del', {
            params: { id }
          })
          .then((res) => {
            // console.log(res.data)//{code: 200, message: '删除成功'}
            // @ts-ignore
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            getReplyInfoData()
          })
      })
      .catch(() => {
        // @ts-ignore
        ElMessage({
          type: 'info',
          message: '删除失败'
        })
      })
  }
  //获取子组件传过来的单个回复信息
  const Editreply = (row: Object) => {
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
    // 点击其他页数的时候，调用获取回复信息数据的函数
    getReplyInfoData()
  }
  
  // @ts-ignore
  const tableData = ref([]) // table表格数据
  // @ts-ignore
  // table表格列名
  const tableLabel = ref([
  {  
    prop: 'id',  
    label: 'ID'  
  },  
  {  
    prop: 'content',  
    label: '内容'  
  },  
  {  
    prop: 'likeCount',  
    label: '点赞数'  
  },  
  {  
    prop: 'dislikeCount',  
    label: '不喜欢数'  
  },  
  {  
    prop: 'level',  
    label: '楼层'  
  },  
  {  
    prop: 'replyCount',  
    label: '回复数'  
  },  
  {  
    prop: 'sendTime',  
    label: '发送时间'  
  },  
  {  
    prop: 'senderId',  
    label: '发送者ID'  
  },  
  {  
    prop: 'postId',  
    label: '帖子ID'  
  },  
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
  //调用回复测试信息数据
  
const getReplyInfoData = (username) => {
  let number;
  if (typeof config.total === 'object' && typeof config.total.value !== 'undefined') {
    // 如果config.total是对象且有value属性
    number = config.total.value;
   } else if (typeof config.total === 'number') {
    // 如果config.total是数字
    number = config.total;}
      
  console.log(config);
  const url = username ? 
      `http://localhost:8080/admin/floor/search?username=${encodeURIComponent(username)}&pageNum=${config.page.value}&pageSize=${number}` :
      `http://localhost:8080/admin/floor/all?pageNum=${config.page.value}&pageSize=${number}`;
    axios.get(url).then((resp) => {
        if (resp.data.code === 0) {
            console.log('success');

            config.loading = true;
            tableData.value = resp.data.data.map((item) => {
                // item.status = item.deleted === 0 ? '正常' : '注销';
                // item.status = item.status === 0 ? '正常' : '禁言';
                
                    if (item.status === 0) {
                        item.status = '正常';
                    } else {
                        item.status = '禁言';
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
  // 在组件挂载时调用 getLawyerInfoData
  // @ts-ignore
  onMounted(getReplyInfoData)
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/scss/tableform';
  </style>
  