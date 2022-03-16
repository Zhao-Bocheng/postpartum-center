import { getCloudDBRef } from "./cloudUtils";

const DB = getCloudDBRef();
const _ = DB.command;

const USER_COLLECTION = "users";

// 获取当前用户信息
// 在新的安全规则体系下不需要先通过云函数获取openId
// https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/security-rules.html#%E4%B8%8E%E5%9F%BA%E7%A1%80%E6%9D%83%E9%99%90%E9%85%8D%E7%BD%AE%E7%9A%84%E5%AF%B9%E6%AF%94
// https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/security-rules.html#%E8%A7%84%E5%88%99%E5%8C%B9%E9%85%8D
export function getUserData() {
  return new Promise((resolve, reject) => {
    DB.collection(USER_COLLECTION).where({
      // 当权限为 "仅创建者可读写" 时，查询时会默认给查询条件加上一条 _openid 必须等于用户 openid
      // 这个查询条件实际上是可以省略的
      _openid: "{openid}"
    }).get({
      success(res) {
        resolve(res.data[0] ? res.data[0] : null);
      },
      fail(err) {
        reject(err);
      }
    })
  })
}

// 获取所需权限列表
// export function getAuthList() {
//   return new Promise((resolve, reject) => {

//   })
// }