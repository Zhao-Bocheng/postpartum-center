const Cloud = require("wx-server-sdk");

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