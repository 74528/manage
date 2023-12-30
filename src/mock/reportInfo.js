/**
 * AutoImport 插件主要用于自动导入 JavaScript 模块、库和标识符，
 * 通常用于导入在项目中引用的第三方库、框架或模块。对于 Mock 数据，
 * 通常是在你的项目代码中手动导入的，因为 Mock 数据通常是项目特定的，
 * 而不是标准的第三方库。
 */

import Mock from 'mockjs'
// get请求从config.url获取参数，report从config.body中获取参数
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
// 生成举报信息数据  
let data = Mock.mock({
  'reportInfo|100': [
    {
      id: Mock.Random.id(), // 随机ID
      reason: '@ctitle', // 报告原因
      explain: '@sentence', // 报告详细说明
      reporterId: Mock.Random.id(), // 报告人ID
      category: Mock.Random.pick(['违规内容', '广告推广', '恶意攻击', '其他']), // 报告类别
      replyId: Mock.Random.id(), // 被举报回复ID
      reportTime: Mock.Random.date(), // 报告时间）
      status: Mock.Random.boolean() // 报告状态
    }
  ]
});
  
export default {  
  // 条件分页查询数据，默认每页20条  
  getReportInfoData: config => {  
    const {id, page = 1, limit = 20 } = parseURL(config.url);  
    const mockList = data.reportInfo.filter(report => {
      if (id && report.id.indexOf(id) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      count: mockList.length,
      reportInfo: pageList
    }
  },
  // 修改举报信息  
  updateReportInfo: config => {
    const {
      reason, // 更新为举报原因
      explain, // 更新为举报详细说明
      reporterId, // 更新为报告人ID
      category, // 更新为举报类别
      replyId, // 更新为被举报回复ID
      reportTime, // 更新为报告时间
      status // 更新为报告状态
    } = JSON.parse(config.body)._value; // 从请求体中获取更新信息

    data.reportInfo.some(report => {
        if (report.id !== -1) {  
            // 更新找到的举报信息
            report.reason = reason;
            report.explain = explain;
            report.reporterId = reporterId;
            report.category = category;
            report.replyId = replyId;
            report.reportTime = reportTime;
            report.status = status;

            return true;
        }
    })
  return {
    code: 200,
    data: {
      message: '编辑成功'
    }
  }
},
  // 删除举报信息  
  delReportInfo: config => {  
    const { id } = parseURL(config.url)
    // console.log(id)
    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      data.reportInfo = data.reportInfo.filter(report => report.id !== id)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },

  addReportInfo: config => {
    const {
      reason, // 新增为举报原因
      explain, // 新增为举报详细说明
      reporterId, // 新增为报告人ID
      category, // 新增为举报类别
      replyId, // 新增为被举报回复ID
      reportTime = new Date().toISOString(), // 如果没有提供报告时间，则使用当前时间
      status = 'pending' // 如果没有提供状态，则默认为'pending'
    } = JSON.parse(config.body)._value; // 从请求体中获取新增信息

    data.reportInfo.unshift({
      id: Mock.Random.id(), // 生成随机ID
      reason: reason,
      explain: explain,
      reporterId: reporterId,
      category: category,
      replyId: replyId,
      reportTime: reportTime,
      status: status
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  
  }
}