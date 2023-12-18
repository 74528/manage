/**
 * AutoImport 插件主要用于自动导入 JavaScript 模块、库和标识符，
 * 通常用于导入在项目中引用的第三方库、框架或模块。对于 Mock 数据，
 * 通常是在你的项目代码中手动导入的，因为 Mock 数据通常是项目特定的，
 * 而不是标准的第三方库。
 */
import axios from 'axios';
import Mock from 'mockjs'
// get请求从config.url获取参数，reply从config.body中获取参数
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
  'replyInfo|100': [  
    {
      id: Mock.Random.id(), // 随机ID  
      content: Mock.Random.sentence(3), // 随机句子  
      like_count:'@integer(0,100)', // 随机点赞数  
      dislike_count:'@integer(0,100)', // 随机不喜欢数  
      reply_to: Mock.Random.id(), // 随机回复ID  
      send_time: Mock.Random.date(), // 随机发送时间  
      sender_id: Mock.Random.id(), // 随机发送者ID  
      floor_id: Mock.Random.id(), // 随机楼层ID  
      status: Mock.Random.boolean() // 随机状态
    }
  ]  
});  
  
export default {  
  // 条件分页查询数据，默认每页20条  
  getReplyInfoData: config => {  
    const {id, page = 1, limit = 20 } = parseURL(config.url);  
    const mockList = data.replyInfo.filter(reply => {
      if (id && reply.id.indexOf(id) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      count: mockList.length,
      replyInfo: pageList
    }
  },
  // 修改帖子信息  
  updateReplyInfo: config => { 
    const { 
      content,  
      like_count,  
      dislike_count,  
      reply_to,  
      send_time,  
      sender_id,  
      floor_id,  
      status   } = JSON.parse(config.body)._value; // 从请求体中获取更新信息  
    data.replyInfo.some(reply => {
    if (reply.id !== -1) {  
      // 更新找到的帖子信息  
      reply.content = content;  
      reply.like_count = like_count;  
      reply.dislike_count = dislike_count;  
      reply.reply_to = reply_to;  
      reply.send_time = send_time;  
      reply.sender_id = sender_id;  
      reply.floor_id = floor_id;  
      reply.status = status;  
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
  delReplyInfo: config => {  
    const { id } = parseURL(config.url)
    // console.log(id)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      data.replyInfo = data.replyInfo.filter(reply => reply.id !== id)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },

    addReplyInfo: config => {  
    const {  
    content,  
    like_count,  
    dislike_count,  
    reply_to,  
    send_time,  
    sender_id,  
    floor_id,  
    status  
    } = JSON.parse(config.body)._value; // 从请求体中获取新增信息  
    data.replyInfo.unshift({
      id: id || Mock.Random.id(), // 如果没有提供id，则生成随机id  
      content: content,  
      like_count: like_count || 0, // 如果没有提供点赞数，则默认为0  
      dislike_count: dislike_count || 0, // 如果没有提供不喜欢数，则默认为0  
      reply_to: reply_to,  
      send_time: send_time || new Date().toISOString(), // 如果没有提供发送时间，则使用当前时间  
      sender_id: sender_id || Mock.Random.id(), // 如果没有提供发送者ID，则生成随机ID  
      floor_id: floor_id || Mock.Random.id(), // 如果没有提供楼层ID，则生成随机ID  
      status: status || 'pending' // 如果没有提供状态，则默认为'pending'  
   
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  
  }
}