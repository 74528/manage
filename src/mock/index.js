import Mock from 'mockjs'
import homeApi from './home'
import userInfoApi from './userInfo'
import permissionApi  from './permission'
import postInfoApi from './postInfo'
import replyInfoApi from './replyInfo'
import reportInfoApi from './reportInfo'
import chartInfoApi from './chartInfo'


// 设置mock响应时间为200-2000毫秒范围
Mock.setup({
  timeout: '200-2000'
})

// ----------------------首页mock接口数据----------------------
/* 
  1.使用官网提供的mock方法返回接口数据
    - mock方法的参数：
      rurl：表示需要拦截的 URL，可以是 URL 字符串或 URL 正则（正则不需要打引号）。例如 /\/domain\/list\.json/
      rtype：表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。
      function(option)：表示用于生成响应数据的函数。该函数由业务配置文件提供，例如home.js文件
*/
// ----------------------权限相关----------------------
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)
//正则
Mock.mock(/\/home\/getData/, 'get', homeApi.getHomeData)
// ----------------------律师相关----------------------
//字符串
Mock.mock('home/getData', 'get', homeApi.getHomeData)
//获取用户信息接口
Mock.mock(/\/userInfo\/getUserInfoData/, 'get', userInfoApi.getUserInfoData)
//编辑用户信息接口
Mock.mock(/\/userInfo\/edit/, 'post', userInfoApi.updateUserInfo)
//删除用户信息接口
Mock.mock(/\/userInfo\/del/, 'get', userInfoApi.delUserInfo)
//新增用户信息接口
Mock.mock(/\/userInfo\/add/, 'post', userInfoApi.addUserInfo)


//获取帖子信息接口
Mock.mock(/\/postInfo\/getPostInfoData/, 'get', postInfoApi.getPostInfoData)
//编辑帖子信息接口
Mock.mock(/\/postInfo\/edit/, 'post', postInfoApi.updatePostInfo)
//删除帖子信息接口
Mock.mock(/\/postInfo\/del/, 'get', postInfoApi.delPostInfo)
//新增帖子信息接口
Mock.mock(/\/postInfo\/add/, 'post', postInfoApi.addPostInfo)


// 获取回复信息接口  
Mock.mock(/\/replyInfo\/getReplyInfoData/, 'get', replyInfoApi.getReplyInfoData)  
// 编辑回复信息接口  
Mock.mock(/\/replyInfo\/edit/, 'post', replyInfoApi.updateReplyInfo)  
// 删除回复信息接口  
Mock.mock(/\/replyInfo\/del/, 'get', replyInfoApi.delReplyInfo)  
// 新增回复信息接口  
Mock.mock(/\/replyInfo\/add/, 'post', replyInfoApi.addReplyInfo)


// 获取举报信息接口  
Mock.mock(/\/reportInfo\/getReportInfoData/, 'get', reportInfoApi.getReportInfoData)  
// 编辑举报信息接口  
Mock.mock(/\/reportInfo\/edit/, 'post', reportInfoApi.updateReportInfo)  
// 删除举报信息接口  
Mock.mock(/\/reportnfo\/del/, 'get', reportInfoApi.delReportInfo)  
// 新增举报信息接口  
Mock.mock(/\/reportInfo\/add/, 'post', reportInfoApi.addReportInfo)

// 获取图标信息接口  
Mock.mock(/\/chartInfo\/getChartInfoData/, 'get', chartInfoApi.getChartInfoData)  
// 编辑图标信息接口  
Mock.mock(/\/chartInfo\/edit/, 'post', chartInfoApi.updateChartInfo)  
// 删除图标信息接口  
Mock.mock(/\/chartnfo\/del/, 'get', chartInfoApi.delChartInfo)  
// 新增图标信息接口  
Mock.mock(/\/chartInfo\/add/, 'post', chartInfoApi.addChartInfo)