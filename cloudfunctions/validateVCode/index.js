// 云函数入口文件
const Cloud = require('wx-server-sdk')

Cloud.init({
  env: Cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
  const vcode = event.vcode;
  const pnumber = event.pnumber;
  const openid = event.userInfo.openId;

  const dbData = await getVCodeRecord({
    pnumber,
    openid
  });

  // 没有查询到记录
  if(dbData.length === 0) {
    return false;
  }
  const record = dbData[0];
  // 验证码不匹配
  if(record.vcode !== vcode) {
    return false;
  }
  // 验证码已被使用过
  if(record.status !== "normal") {
    return false;
  }
  // 验证码过期
  if(Date.now() - record.createTime > record.validFor) {
    return false;
  }

  await updataVCodeStatus(record._id, "used");

  return true;
}

const VCODE_RECORD = "vcode-record";

// 获取验证码记录
// 需要传入查询条件有 手机号码pnumber, 用户openid
async function getVCodeRecord(params) {
  const {pnumber, openid} = params;

  const db = Cloud.database();

  const dbRes = await db.collection(VCODE_RECORD).where({
    _openid: openid,
    pnumber: pnumber,
  }).orderBy('createTime', 'desc').limit(1).get();
  const dbData = dbRes.data;
  
  return dbData;
}

// 更新验证码状态
async function updataVCodeStatus(recordId, status) {
  const db = Cloud.database();

  const dbRes = await db.collection(VCODE_RECORD).where({
    _id: recordId,
  }).update({
    data: {
      status
    }
  })

  return dbRes;
}