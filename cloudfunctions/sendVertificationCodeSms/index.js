const Cloud = require('wx-server-sdk')

// 云数据库中存储sms类型和其对应短信模板等信息的数据库名称
const SMS_DB = "tencent-sms";

Cloud.init({
  env: Cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  // 验证码短信类型：注册 或 登录 ("register" 或 "login")
  const smsType = event.smsType;
  // 目标联系人手机号码
  const phoneNumberSet = event.phoneNumberSet;
  // 验证码长度（默认 6 位）
  const vcodeLen = Number.isInteger(event.vcodeLen) ? event.vcodeLen : 6;
  // 验证码有效期（minute）
  const termOfValidity = (Number.isInteger(event.termOfValidity) && event.termOfValidity >= 3) ? event.termOfValidity : 5; // 默认 5 分钟
  
  // 从数据库获取验证码短信的正文模板 ID 等内容
  const db = Cloud.database();
  const dbRes = await db.collection(SMS_DB).where({
    smsType
  }).get();
  const dbData = dbRes.data;
  // 如果获取不到记录则抛出错误
  if(dbData.length === 0) {
    throw new Error("传入 smsType 的值有误: 取值为\"login\"或\"register\"")
  }
  // 短信正文模板ID
  const templateId = dbData[0].templateId;

  // 正文模板参数列表（验证码短信的模板统一需要两个参数：验证码和验证码有效分钟数）
  // 参数顺序规定为 验证码在前，分钟数在后
  const templateParamSet = [];
  // 生成 6 位随机验证码
  const vcode = generateCode(vcodeLen);
  templateParamSet.push(vcode);
  // 验证码有效期（minute）
  templateParamSet.push(String(termOfValidity));

  const sendSmsRes = await Cloud.callFunction({
    name: "sendSms",
    data: {
      templateId,
      phoneNumberSet,
      templateParamSet
    }
  })

  return sendSmsRes.result;
}

function generateCode(codeLen) {
  // 验证码保持在 4 到 6 位
  if (codeLen > 6) {
    codeLen = 6;
  }
  if (codeLen < 4) {
    codeLen = 4;
  }

  const rawCode = Math.random().toString().slice(2);
  const rawCodeLen = rawCode.length;

  const randomIdx = Math.floor(Math.random() * rawCodeLen);
  console.log(randomIdx, rawCode);
  const code =
    randomIdx + 6 <= rawCodeLen
      ? rawCode.slice(randomIdx, randomIdx + codeLen)
      : rawCode.slice(randomIdx + 1 - codeLen, randomIdx + 1);

  return code;
}