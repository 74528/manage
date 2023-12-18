<template>
  <el-form :inline="inline" :model="form" ref="form" label-width="100px">
    <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label">
      <!-- 输入框 -->
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
  inline: Boolean,
  form: Object,
  formLabel: Array
})
</script>


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