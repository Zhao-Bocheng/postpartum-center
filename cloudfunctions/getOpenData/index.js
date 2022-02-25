const Cloud = require("wx-server-sdk");

exports.main = async (event, context) => {
  // return event[event.keyName];
  const res = Object.assign({}, event);
  delete res.userInfo;

  return res;
}