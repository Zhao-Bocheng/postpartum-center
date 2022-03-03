const Cloud = require("wx-server-sdk");

Cloud.init({
  env: Cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const res = Object.assign({}, event);
  delete res.userInfo;

  return res;
}