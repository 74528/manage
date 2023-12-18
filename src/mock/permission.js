/**
 * AutoImport 插件主要用于自动导入 JavaScript 模块、库和标识符，
 * 通常用于导入在项目中引用的第三方库、框架或模块。对于 Mock 数据，
 * 通常是在你的项目代码中手动导入的，因为 Mock 数据通常是项目特定的，
 * 而不是标准的第三方库。
 */
import Mock from 'mockjs'
export default {
  // 获取菜单接口
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    //先判断用户是否存在(这里给定2个用户admin和test用户)
    if (username === 'admin' || username === "test") {
      //判断账号密码是否匹配（实际生产需要后端：根据账号关联出用户角色）
      if (username === 'admin' && password === '123456') {
        return {
          code: 200,
          token: Mock.Random.guid(),
          message: "获取成功",
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: IconEpHomeFilled,
                url: 'Home/Home'
              },
              // 设置子级菜单路由
              {
                label: '律师管理',
                icon: IconEpUserFilled,
                children: [
                  {
                    path: '/lawyerInfo',
                    name: 'lawyerInfo',
                    label: '律师信息',
                    url: 'LawyerInfo/LawyerInfo'
                  },
                  {
                    path: '/lawyerReview',
                    name: 'lawyerReview',
                    label: '律师审核',
                    url: 'LawyerReview/LawyerReview'
                  }
                ]
              },
              {
                label: '统计报表',
                icon: IconEpHistogram,
                children: [
                  {
                    path: '/orderReport',
                    name: 'orderReport',
                    label: '订单报表',
                    url: 'OrderReport/OrderReport'
                  }
                ]
              },
              {
                label: '系统管理',
                icon: IconEpTools,
                children: [
                  {
                    path: '/user',
                    name: 'user',
                    label: '用户管理',
                    url: 'User/User'
                  },
                  {
                    path: '/systemLog',
                    name: 'systemLog',
                    label: '系统日志',
                    url: 'SystemLog/SystemLog'
                  }
                ]
              }
            ]
          }
          
        }
      } else if (username === 'test' && password === '123456') {
        return {
          code: 200,
          token: Mock.Random.guid(),
          message: "获取成功",
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: IconEpHomeFilled,
                url: 'Home/Home'
              },
              // 设置子级菜单路由
              {
                label: '律师管理',
                icon: IconEpUserFilled,
                children: [
                  {
                    path: '/lawyerInfo',
                    name: 'lawyerInfo',
                    label: '律师信息',
                    url: 'LawyerInfo/LawyerInfo'
                  },
                  {
                    path: '/lawyerReview',
                    name: 'lawyerReview',
                    label: '律师审核',
                    url: 'LawyerReview/LawyerReview'
                  }
                ]
              },
            ]
          }
        }
      } else {
        return {
          code: -999,
          data: {
            message: '密码错误'
          }
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}