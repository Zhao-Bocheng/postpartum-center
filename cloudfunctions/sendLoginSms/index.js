// 云函数入口文件
const Cloud = require('wx-server-sdk');

// 登录验证码短信的标识
const LOGIN = "login";

Cloud.init({
  env: Cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const phoneNumberSet = [event.phoneNumber];

  const sendSmsRes = await Cloud.callFunction({
    name: "sendVertificationCodeSms",
    data: {
      smsType: LOGIN,
      phoneNumberSet
    }
  });

  return sendSmsRes.result;
}