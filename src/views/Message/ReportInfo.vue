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
        <el-button type="primary" @click="addReport">+ 新增</el-button>
        <common-form inline :formLabel="formLabel" :form="searchForm">
          <el-button type="primary" @click="getReportInfoData(searchForm.keyword)">搜索</el-button>
        </common-form>
      </div>
      <!-- 使用 CommconTable -->
      <common-table
        :tableData="tableData"
        :tableLabel="tableLabel"
        :config="config"
        @valToParent="hangdleValFromChild"
        @handleEdit="Editreport"
        @handleDel="DelReport"
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
  // 打开新增举报窗口
  const addReport = () => {
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
      const response = await axios.report('/reportInfo/edit', operateForm)
      // console.log('response=====>', response)
    } else {
      // 否则就是新增
      // @ts-ignore
      const response = await axios.report('/reportInfo/add', operateForm)
      console.log('response=====>', response)
    }
    //关闭表单弹窗
    isShow.value = false
    //刷新表格数据
    getReportInfoData()
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
 reason:'',
 explain:'',
 reporterId:'',
 category:'',
 replyId:'',
 reportTime:'',
 status:'',
  })
  // form表单的标题
  // @ts-ignore
  const operateFormLabel = ref([
  {  
    model: 'id',  
    label: '举报贴Id'  
  },  
  {  
    model: 'reason',  
    label: '举报原因'  
  },  
  {  
    model: 'explain',  
    label: '详细原因'  
  },  
  {  
    model: 'reporterId',  
    label: '举报人id'  
  },  
  {  
    model: 'category',  
    label: '帖子类别',
    type: 'select',
    opts: [
      {
        label: '讨论区',
        value: true
      },
      {
        label: '专业区',
        value: false
      }
    ]  
  },  
  {  
    model: 'replyId',  
    label: '帖子id'  
  },  
  {  
    model: 'reportTime',  
    label: '举报时间'  
  },  
   
  {  
    model: 'status',  
    label: '处理状态',
     type: 'select',
    opts: [
      {
        label: '可用',
        value: true
      },
      {
        label: '封禁',
        value: false
      }
    ]
  } 
   
  ])
  // 删除
  const DelReport = (row: Object) => {
    //打印纸组件发送编辑表格事件的行数据
    // console.log('row=======>', row)
    // @ts-ignore
    ElMessageBox.confirm('此操作将永久删除该用户,是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        //1. 请求删除接口，根据id删除举报信息
        // @ts-ignore
        let id = row.id
        // @ts-ignore
        axios
          .get('/reportInfo/del', {
            params: { id }
          })
          .then((res) => {
            // console.log(res.data)//{code: 200, message: '删除成功'}
            // @ts-ignore
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            getReportInfoData()
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
  //获取子组件传过来的单个举报信息
  const Editreport = (row: Object) => {
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
    // 点击其他页数的时候，调用获取举报信息数据的函数
    getReportInfoData()
  }
  
  // @ts-ignore
  const tableData = ref([]) // table表格数据
  // @ts-ignore
  // table表格列名
  const tableLabel = ref([
  {  
    prop: 'id',  
    label: '举报贴Id'  
  },  
  {  
    prop: 'reason',  
    label: '举报原因'  
  },  
  {  
    prop: 'explain',  
    label: '详细原因'  
  },  
  {  
    prop: 'reporterId',  
    label: '举报人id'  
  },  
  {  
    prop: 'category',  
    label: '帖子类别'  
  },  
  {  
    prop: 'replyId',  
    label: '帖子id'  
  },  
  {  
    prop: 'reportTime',  
    label: '举报时间'  
  },  
   
  {  
    prop: 'status',  
    label: '处理状态',
    
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
  // 调用举报测试信息数据
  const getReportInfoData = async () => {
    axios.get(`http://localhost:8080/admin/report/all?pageNum=${config.page.value}&pageSize=${config.total.value}`).then((resp) => {
        if (resp.data.code === 0) {
            console.log('success');
            config.loading = true;
            tableData.value = resp.data.data.map((item) => {
                // item.status = item.deleted === 0 ? '正常' : '注销';
                // item.status = item.status === 0 ? '正常' : '禁言';
              
                    if (item.status === 0) {
                        item.status = '未处理';
                    } else if(item.status === 1) {
                        item.status = '处理完成';
                    }else{
                      item.status = '不接受';
                    }
                item.category = item.category === 0 ? '讨论区' : '专业区'
                item.reason = item.reason === 0 ? '违反法律法规' : '违反论坛规定'
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
  onMounted(getReportInfoData)
  </script>
  
  <style lang="scss" scoped>
  @import '@/assets/scss/tableform';
  </style>
  