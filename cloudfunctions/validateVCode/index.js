// 云函数入口文件
const Cloud = require('wx-server-sdk')

Cloud.init({
  env: Cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
  
}