/**
 * AutoImport 插件主要用于自动导入 JavaScript 模块、库和标识符，
 * 通常用于导入在项目中引用的第三方库、框架或模块。对于 Mock 数据，
 * 通常是在你的项目代码中手动导入的，因为 Mock 数据通常是项目特定的，
 * 而不是标准的第三方库。
 */
import axios from 'axios'
import Mock from 'mockjs'
// get请求从config.url获取参数，post从config.body中获取参数
function parseURL(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

//生成userInfo数组  
let data = Mock.mock({
  //生成一个包含 80 到 100 个元素的userInfo数组  
  // 'userInfo|80-100': [
  // 注意这里不能随机生成，逻辑会混乱
  'userInfo|100': [
    {
      id: '@id',//随机id @id 用于生成随机的唯一标识符（通常是字符串）。
      username: '@name',//随机名称
      nickName: '@last',//随机昵称
      phone_number: /^1[34578]\d{9}$/,//随机电话号码
      gender: '@boolean',//随机性别
      createTime: '@datetime',//创建时间
      register_time: '@datetime',//创建时间
      last_login_time: '@datetime',
      status: '@boolean',
      intro:'@word',
      deleted:'@word',
      avatar() {
        //用户头像
        return Mock.Random.image('50×50', Mock.Random.color(), '#757575', 'png', this.username)
      }
    }
  ]
})


export default {
  //条件分页查询数据，默认每页20条
  getUserInfoData: config => {
    // axios.get('localhost:8080/test').then((data) => {
    //   console.log(data); 
    // }); 
    // return;
    const { username, page = 1, limit = 20 } = parseURL(config.url)
    // console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    //这段代码的目的是根据姓名 (name) 对 data.userInfo 数组进行筛选，生成一个符合条件的新数组 mockList。
    const mockList = data.userInfo.filter(user => {
      if (username && user.username.indexOf(username) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      count: mockList.length,
      userInfo: pageList
    }
  },


  //修改用户
  updateUserInfo: config => {
    const {
      id,
      username,
      password,
      phone_number,
      gender,
      intro,
      register_time,
      last_login_time,
      status,
      deleted } = JSON.parse(config.body)._value//JSON.parse()方法用来解析 JSON 字符串，就是把JSON字符串转成对象。
      // console.log("isMale====>",isMale)
    // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）
    data.userInfo.some(user => {
      if (user.id === id) {
        user.username = username
        user.password = password
        user.phone_number = phone_number
        user.gender = gender
        user.intro = intro
        user.gender = gender
        user.register_time = register_time
        user.last_login_time = last_login_time
        user.status=status
        user.deleted=deleted
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  },



  //删除用户
  delUserInfo: config=>{
    const { id } = parseURL(config.url)
    // console.log(id)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      data.userInfo = data.userInfo.filter(user => user.id !== id)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },



  //新增用户
  addUserInfo: config=>{
    const {
      username,
      password,
      phone_number,
      gender,
      intro,
      avater,
      register_time,
      last_login_time,
      status,
      deleted} = JSON.parse(config.body)._value//JSON.parse()方法用来解析 JSON 字符串，就是把JSON字符串转成对象。
    /**
     * unshift 是 JavaScript 数组的一个方法，
     * 它用于在数组的开头插入一个或多个元素，
     * 并返回新的数组长度。
     */
    data.userInfo.unshift({
      id: Mock.Random.guid(),
      username:username,
      password:password,
      phone_number:phone_number,
      gender:gender,
      intro:intro,
      avater:avater,
      register_time:register_time,
      last_login_time:last_login_time,
      status:status,
      deleted:deleted
    })
    // console.log("data.userInfo====",data.userInfo)
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  }
}