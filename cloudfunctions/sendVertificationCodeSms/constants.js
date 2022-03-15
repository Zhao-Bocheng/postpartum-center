module.exports = {
  // sms短信类型
  // 注册验证码短信
  REGISTER: "register",
  // 登录验证码短信
  LOGIN: "login",

  // sms短信正文模板ID
  // 注册短信正文模板1
  TEMPLATE_REGISTER_ID: "1326275",
  // 注册短信正文模板2
  TEMPLATE_REGISTER_ID_2: "1326865",
  // 登录短信正文模板1
  TEMPLATE_LOGIN_ID: "1326325",
  // 登录短信正文模板2
  TEMPLATE_LOGIN_ID_2: "1326866",

  // 验证码状态
  NORMAL: "normal",
  USED: "used",
  EXPIRED: "expired",

  // 数据库名称常量
  // 腾讯SMS模板信息
  SMS_TEMPLATE_INFO: "tencent-sms",
  // 短信验证码记录
  VCODE_RECORD: "vcode-record",
}