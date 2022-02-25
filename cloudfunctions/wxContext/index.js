const Cloud = require("wx-server-sdk");

// 非必要初始化操作，仅为防止本地没有云端初始化
Cloud.init({
  env: Cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async () => {
  const wxcontext = Cloud.getWXContext();
  return {
    openid: wxcontext.OPENID,
    unionid: wxcontext.UNIONID,
    appid: wxcontext.APPID,
  }
}