const Cloud = require('wx-server-sdk')

const USER_DB = "users"

Cloud.init({
  env: Cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const db = Cloud.database();

  const dbRes = await db.collection(USER_DB).where({
    // _openid: {openid},
    _openid: event.userInfo.openId,
  }).get();
  const user = dbRes.data[0];

  return user ? user : null;
}