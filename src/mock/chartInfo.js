/**
 * AutoImport 插件主要用于自动导入 JavaScript 模块、库和标识符，
 * 通常用于导入在项目中引用的第三方库、框架或模块。对于 Mock 数据，
 * 通常是在你的项目代码中手动导入的，因为 Mock 数据通常是项目特定的，
 * 而不是标准的第三方库。
 */
import Mock from 'mockjs'
// get请求从config.url获取参数，chart从config.body中获取参数
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
// 生成帖子数据  
let data = Mock.mock({  
  'chartInfo|100': [  
    {  
      id: '@id', // 随机id  
      title: '@ctitle', // 随机标题  
      send_time: '@datetime', // 随机发送时间  
      reply_count: '@integer(0, 100)', // 随机回复数量  
      max_level: '@integer(0,100)', // 随机等级  
      last_reply_time: '@datetime', // 随机最后回复时间  
      category: '@word', // 随机类别  
      sender_id: '@id', // 随机发送者id  
      status: '@boolean', // 随机状态  
    }  
  ]  
});  
  
export default {  
  // 条件分页查询数据，默认每页20条  
  getChartInfoData: config => {  
    const {id, page = 1, limit = 20 } = parseURL(config.url);  
    const mockList = data.chartInfo.filter(chart => {
      if (id && chart.id.indexOf(id) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      count: mockList.length,
      chartInfo: pageList
    }
  },
  // 修改帖子信息  
  updateChartInfo: config => {  
    const { 
      title, 
      send_time, 
      reply_count, 
      maxlevel, 
      last_reply_time, 
      category, 
      sender_id, 
      status } = JSON.parse(config.body)._value; // 从请求体中获取更新信息  
    data.chartInfo.some(chart => {
    if (chart.id !== -1) {  
      // 更新找到的帖子信息  
      chart.title = title;  
      chart.send_time = send_time;  
      chart.reply_count = reply_count;  
      chart.maxlevel = maxlevel;  
      chart.last_reply_time = last_reply_time;  
      chart.category = category;  
      chart.sender_id = sender_id;  
      chart.status = status; 
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
  // 删除帖子  
  delChartInfo: config => {  
    const { id } = parseURL(config.url)
    // console.log(id)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      data.chartInfo = data.chartInfo.filter(chart => chart.id !== id)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },

    addChartInfo: config => {  
    const {  
      title,  
      send_time,  
      reply_count,  
      maxlevel,  
      last_reply_time,  
      category,  
      sender_id,  
      status,  
    } = JSON.parse(config.body)._value; // 从请求体中获取新增信息  
    data.chartInfo.unshift({
      id: Mock.Random.guid(), // 新增帖子的id  
      title:title, // 新增帖子的标题  
      send_time:send_time, // 新增帖子的发送时间  
      reply_count:reply_count, // 新增帖子的回复数量  
      maxlevel:maxlevel, // 新增帖子的等级  
      last_reply_time:last_reply_time, // 新增帖子的最后回复时间  
      category:category, // 新增帖子的类别  
      sender_id:sender_id, // 新增帖子的发送者id  
      status :status// 新增帖子的状态  
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  
  }
}