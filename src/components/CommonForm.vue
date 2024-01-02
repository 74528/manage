<!-- 用于创建一个表单 -->
<!-- 依赖于从父组件传递下来的数据（如 formLabel）来动态生成表单项。这个子组件可以插入到任何父组件中，并根据父组件传递的数据来展示不同的表单元素 -->
<template>
  <!-- 具有动态生成的字段，这些字段的类型（如输入框、下拉框、开关、日期选择器或图片上传），根据传入的配置生成不同类型的输入控件 -->
  <el-form :inline="inline" :model="form" ref="form" label-width="100px">
    <!-- 为每个元素创建一个表单项。每个表单项都有一个键（item.model）和标签（item.label） -->
    <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label">
      <!-- item.type 的值决定显示哪种输入控件 -->
      <!-- 输入框 -->
      <!-- 双向数据绑定 -->
      <el-input
        v-model="form[item.model]" 
        :placeholder="'请输入' + item.label"
        v-if="!item.type"
      ></el-input>
      <!-- 下拉框 -->
      <el-select v-model="form[item.model]" placeholder="请选择" v-if="item.type === 'select'">
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- switch开关 -->
      <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>
      <!-- 日期 -->
      <el-date-picker
        v-model="form[item.model]"
        value-format="YYYY-MM-DD"
        v-if="item.type === 'date'"
        placeholder="选择日期"
      />
      <!-- 图片 -->
      <el-upload
        v-if="item.type === 'image'"
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
      >
        <img v-if="form[item.model]" :src="form[item.model]" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><i-ep-Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <!-- 按钮使用插槽，由父组件决定按钮 -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
/**
 * const props = defineProps({ ... })
 * 是在 Vue 3 的 <script setup> 区块中
 * 用来声明和接收组件的 props 的语法。
 * 父传子：通过props向子组件传递值
 */
const props = defineProps({
  // props属性
  inline: Boolean, //inline其类型是Boolean
  form: Object,  //form 是一个对象
  formLabel: Array  //formLabel 是一个数组
})
</script>

<!-- 内联（Inline）通常指的是将一个函数或方法的代码直接插入到调用它的地方，
  而不是进行常规的函数调用。这种做法可以减少函数调用的开销，提高执行效率，
  但可能会增加代码的大小，因为函数的代码需要在每个调用点重复 -->

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 90px;
  height: 90px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  text-align: center;
}
</style>