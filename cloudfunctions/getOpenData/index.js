const Cloud = require("wx-server-sdk");

// 非必要初始化操作，仅为防止本地没有云端初始化
Cloud.init({
  env: Cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  // return event[event.keyName];
  const res = Object.assign({}, event);
  delete res.userInfo;

  return res;
}