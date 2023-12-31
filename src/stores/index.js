/**
 * Pinia 是一个基于 Vue 3 的状态管理库，它提供了一种类似于 Vuex 的方式来管理应用程序的状态
 * 使用分3个步骤：
 *  1. 安装Pinia
 *  2. 创建Pinia Store
 *  3. 在main.js创建Pinia 实例
 *  4. 在组件中使用Pinia Store
 * index.js就是一个 Pinia Store，
 * 是一个存储状态的地方，可以包含状态（state）、操作(action)和 getter(getters)。

 */
// 状态管理，管理应用中菜单和标签的相关状态，包括菜单的显示和隐藏、标签的添加和删除
import { defineStore } from 'pinia';
// 布局设置
export const index = defineStore('index', {
  // 在store的state部分，定义了应用的状态，定义了几个状态变量
  state: () => ({
    token: '',
    isCollapse: false,
    menuInfo: [],
    //管理tag标签数据
    tabsList: [
      // tag标签默认标签是首页，且不可删除。
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]
  }),
  // 在store的actions部分，定义了可以改变状态的方法。这些方法通常用于处理异步操作或复杂逻辑
  actions: {
    setMenu(menu) {
      // 设置`menuInfo`状态变量，并将新菜单存储在localStorage中
      this.menuInfo = menu
      localStorage.setItem("menu", JSON.stringify(menu))
    },
    clearMenu() {
      // 清空`menuInfo`和`tabsList`状态变量。  
      this.menuInfo = []
      this.tabsList = []
    },
    //缩放菜单方法
    triggerIsCollapse() {
      this.isCollapse = !this.isCollapse
    },
    //选中菜单方法
    selectMenu(menu) {
      //  console.log("menu====",menu)
      //  menu.name === 'home'?(this.menuInfo = null):(this.menuInfo = menu)
      //迭代 
      if (menu.name !== 'home') {
        // 如果点击导航菜单不是home，将用户点击导航菜单对象赋值给 menuInfo 对象
        this.menuInfo = menu
        // 如果点击导航菜单不是home，首先遍历tag标签数组tabsList是否已有val中的name，如果有则不再重复添加，没有则添加val到tag标签数组tabsList
        let result = this.tabsList.findIndex(item => item.name === menu.name)
        result === -1 ? this.tabsList.push(menu) : ''
        // 将 tabsList 中菜单数据添加到localStorage中
        localStorage.setItem("tabsList", JSON.stringify(this.tabsList))
      } 
    },
    // 关闭tag标签方法
    closeTab(tag) {
      // 首先判断val要删除的tag标签在tabsList数组中是否存在，如果存在则删除
      if (tag === 'home') {
        return
      }
      let result = this.tabsList.findIndex(item => item.name === tag)
      this.tabsList.splice(result, 1)
    }
  }
})
