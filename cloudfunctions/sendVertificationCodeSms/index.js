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
  // 目标联系人手机号码（需要传入一个字符串数组）
  const phoneNumberSet = [event.phoneNumber];
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
  // 验证码有效期（minute）（需要转字符串，因为参数列表要求是一个字符串数组）
  templateParamSet.push(termOfValidity + '');

  const sendSmsRes = await Cloud.callFunction({
    name: "sendSms",
    data: {
      templateId,
      phoneNumberSet,
      templateParamSet
    }
  })

  // 如果验证码成功发送
  if(sendSmsRes.result.SendStatusSet[0].Code === "Ok") {
    // 将该条验证码记录添加到数据库中
    addVcodeRecord({
      openid: event.userInfo.openId,
      pnumber: phoneNumberSet[0],
      vcode: vcode,
      validFor: termOfValidity * 60 * 1000, // minute 转 ms
    })
  }

  return sendSmsRes.result;
}

// 生成随机数字验证码
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

// 参数需要传入 openId, 联系人手机号, 验证码, 验证码有效时间(ms)
async function addVcodeRecord(params) {
  const db = Cloud.database();

  const res = await db.collection("vcode-record").add({
    data: {
      _openid: params.openid,
      pnumber: params.pnumber,
      vcode: params.vcode,
      validFor: params.validFor,
      createTime: new Date(),
      // 新添加的验证码纪录默认为 normal ，即未被使用
      status: "normal",
    }
  })

  return res;
}