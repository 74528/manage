<template>
  <div class="common-table">
    <!-- 
      将表格数据tableData赋值给data 
        -stripe：斑马纹显示表格
    -->
    <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
      <!-- 表格第一列序号 -->
      <el-table-column label="序号" width="65">
        <template #default="scope">
          <!-- 
            设置序号
              -  (config.page - 1) * 20 ：获取当前页数，每页20条
              - scope.$index + 1：设置序号
          -->
          <span>{{ (config.page.value - 1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!-- 
        表格第二列开始
        表格序号后面的列通过遍历父组件传入的data数据动态改变
          -show-overflow-tooltip:超出一行的内容点点点显示
       -->
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        show-overflow-tooltip
      >
        <!-- 
        #default="scope"：这是一个具名插槽 (#default) 的定义，其参数是 scope。
        在 Vue.js 中，插槽可以接受参数，这里的 scope 就是该插槽的参数。
        在 Element Plus 的 <el-image> 组件中，
          fit 属性用于设置图片如何适应容器框。
          alt 是 "alternative text"（替代文本）的缩写。alt 属性用于为图像元素提供替代文本，
          当图像无法显示时或用户使用辅助技术（如屏幕阅读器）时，这段文本将被显示。
         -->
        <template #default="scope">
          <el-image
            v-if="item.type === 'image'"
            :src="scope.row[item.prop]"
            fit="cover"
            alt="Image"
            style="width: 50px; height: 50px"
          ></el-image>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!-- Table表格操作列 -->
      <el-table-column label="操作" fixed="right" width="150">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
       
      </el-table-column>
    </el-table>
    <!-- 
      设置分页
        - :total="config.total":设置总页数
        - v-model:current-page="config.page.value"：设置当前页数
    -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      v-model:page-size="config.count"
      v-model:current-page="config.page.value"
      @current-change="changePage"
    />
  </div>
</template>

<script lang='ts' setup>

/**
 * const props = defineProps({ ... })
 * 是在 Vue 3 的 <script setup> 区块中
 * 用来声明和接收组件的 props 的语法。
 * 父传子：通过props向子组件传递值
 */
const props = defineProps({
  tableData: Array,
  tableLabel: Array,
  config: Object,

})

// defineEmits 函数来定义和获取父组件传递给子组件的自定义事件。
// 它的作用是为子组件声明可以触发的事件，以便子组件可以正确地与父组件通信。
const emit = defineEmits<{
  //valToParent为父组件引入子组件是定义的子组件事件属性，可随意定义
  (event: 'valToParent', val: object): void
  (event: 'handleEdit', val: object): void
  (event: 'handleDel', val: object): void
}>()
//点击编辑按钮触发函数
const handleEdit = (row: object) => {
  //打开浏览器点编辑测试是否可以拿到这行
  // console.log("row=====>",row)
  emit('handleEdit', row)
}
//点击删除按钮触发函数
const handleDelete = (row: object) => {
  //打开浏览器点编辑测试是否可以拿到这行
  console.log('row=====>', row);
  emit('handleDel', row)
}

//点击页数获取页码
const changePage = (val: object) => {
  // console.log(val)//可以查看是否获取到val
  emit('valToParent', { value: val });
}
</script>

<style lang="scss" scoped>
.common-table {
  // 设置表格高度，减去页面header高度
  height: calc(100% - 62px);
  // 设置表格背景色
  background-color: #fff;
  // 设置相对定位
  position: relative;
  // 设置分页样式
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>

