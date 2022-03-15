// 云函数入口文件
const Cloud = require('wx-server-sdk');

// 登录验证码短信的标识
const LOGIN = "login";

Cloud.init({
  env: Cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const phoneNumber = event.phoneNumber;

  const sendSmsRes = await Cloud.callFunction({
    name: "sendVertificationCodeSms",
    data: {
      smsType: LOGIN,
      phoneNumber,
      vcodeLen: 6,
      termOfValidity: 3,
      // 在云端被调用的云函数上下文无法获取到用户 openid ，需要特地传递参数
      userInfo: event.userInfo,
    }
  });

  return sendSmsRes.result;
}