/**
 * AutoImport 插件主要用于自动导入 JavaScript 模块、库和标识符，
 * 通常用于导入在项目中引用的第三方库、框架或模块。对于 Mock 数据，
 * 通常是在你的项目代码中手动导入的，因为 Mock 数据通常是项目特定的，
 * 而不是标准的第三方库。
 */
import Mock from 'mockjs'

export default {
  getHomeData: () => {
    return {
      code: 200,
      data: {
        userInfo: [
          {
            name: '管理员',
            age: Mock.Random.integer(0,130)
          },
        ]
      }
    }
  }
}

