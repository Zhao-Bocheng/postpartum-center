// 常用工具函数封装
// 主要是业务逻辑的封装

import { getUserData } from "./cloudDBUtils";
// 引入腾讯地图SDK
import QQMapSDK from "./qqMapInit";

// 显示“打开设置”弹窗
export function showOpenSettingModal(
  title = "部分权限被禁止使用",
  content = "请允许打开设置修改权限，以便功能正常使用"
) {
  // 打开了设置则 resolve 设置的结果，否则 reject
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      showCancel: true,
      cancelText: "取消",
      confirmText: "打开设置",
      success(res) {
        // console.log("commonUtils showOpenSettingModal-showModal success", res);
        if (res.confirm) {
          wx.openSetting({
            withSubscriptions: true,
            success(settingRes) {
              console.log("commonUtils showOpenSettingModal-openSetting success", settingRes);
              resolve(settingRes);
            }
          });
        }
        if (res.cancel) {
          console.log("commonUtils showOpenSettingModal-showModal cancel", res);
          reject(res);
        }
      },
    });
  })
}

// 获取头像和昵称
export function getUserProfile() {
  return new Promise((resolve, reject) => {
    // wx.showLoading();
    wx.getUserProfile({
      desc: '获取您的头像和昵称',
      lang: "zh_CN"
    }).then(res => {
      console.log("commonUtils getUserProfile success", res);
      // wx.hideLoading();
      resolve(res.userInfo);
    }).catch(err => {
      console.log("commonUtils getUserProfile fail", err);
      // wx.hideLoading();
      // wx.showToast({
      //   title: '获取失败',
      //   icon: "error",
      //   duration: 1500,
      // })
      reject(err);
    })
  })
}

// 获取地理位置（详细地点名称）
export function getLocation() {
  return new Promise((resolve, reject) => {
    // 如果是第一次调用 wx.getLocation() 会自动弹窗，只有拒绝位置信息授权后才调用自定义弹窗
    wx.getLocation({
      type: "gcj02",
      success(res) {
        console.log("commonUtils getLocation-getLocation success", res);
        const {
          latitude,
          longitude
        } = res;

        // 使用腾讯地图SDK进行逆地址解析
        QQMapSDK.reverseGeocoder({
          location: {
            latitude,
            longitude,
          },
          success(res, data) {
            console.log("commonUtils getLocation-reverseGeocoder success", res);
            console.log("commonUtils getLocation-reverseGeocoder success", data);
            resolve(res.result);
          },
          fail(err) {
            console.log("commonUtils getLocation-reverseGeocoder fail", err);
            reject(err);
          }
        })
      },
      fail(err) {
        console.log("commonUtils getLocation-getLocation fail", err);

        /*
          wx.getLocation() 通常有两种情况会走 fail 逻辑
          1. wx.getLocation() 有调用频率限制，30s内仅第一次有效，在开发版和体验版走fail逻辑，正式版复用第一次结果
          2. 未获得位置信息授权时
          只有在未获得位置信息授权时才需要调用打开设置弹窗
          利用两种情况下的 errMsg 不一样的特点来判断是否需要调用弹窗（当然也可以通过wx.getSetting()获取设置的授权状态来判断）
        */
        // 当无位置信息授权时，errMsg 为 "auth deny" 或 "auth denied" 
        if (err.errMsg.match(/auth den((ied)|y)/)) {
          showOpenSettingModal("无法获取地理位置", "为了功能的正常使用，请打开位置消息权限")
            .then(res => {
              // 设置之后再试着获取一次位置
              getLocation()
                .then(res => {
                  resolve(res);
                })
                .catch(err => {
                  reject(err);
                })
            })
            .catch(err => {
              reject(err);
            })
        } else {
          reject(err);
        }
      }
    })
  })
}

// 这里的登录机制简单处理，将 openId 作为用户唯一标识
// 将 openId 和用户信息（微信头像等）绑定传到云环境存储，将业务中用到的数据也和openId绑定
/*
  获取 openId
  根据 openId 到数据库获取数据
  获取手机号（用户手动输入）
  openId 和手机号绑定（需要验证码）？？？(验证码暂定使用网易易盾的服务)
  获取头像和昵称（或自定义）？？？
  获取地理位置？？？
  一段时间登录过期
*/

// 发送验证码
export function sendCAPTCHA(params) {
  
}

// 注册流程
export function register() {
  // 获取头像和昵称（或自定义头像和昵称）

  // 获取地理位置

  // 填写手机号码

  // 发送验证码


}

// 登录 
export function login() {
  
}

// 登录流程
export function wxLogin() {
  return new Promise((resolve, reject) => {
    // 去数据库提取用户信息（不需要特地去获取用户的openid）
    getUserData().then(res => {
      if(res.length) {
        const userData = res[0];
        console.log("commonUtils wxLogin-gerUserData success", userData);
        resolve(userData);
      } else {
        // register()
        console.log("注册~~~");
      }
    }).catch(err => {
      console.log("commonUtils wxLogin-gerUserData fail", err);
      reject(err);
    })

    // 提取不到就提醒注册
    // wx.showModal({
    //   title: "当前微信账户未注册",
    //   content: "当前微信账户未注册，如需使用完整功能请前往注册",
    //   cancelText: "取消",
    //   confirmText: "去注册",
    //   success(res) {
    //     if(res.confirm) {

    //     }
    //   }
    // })
    // // 获取头像和昵称
    // let avatarUrl = '', nickName = '', userInfo = null;
    // getUserProfile()
    //   .then(res => {
    //     avatarUrl = res.avatarUrl;
    //     nickName = res.nickName;
    //     userInfo = res;
        // getLocation()
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(err => {})
        //   .finally(() => {
        //     _this.setData({
        //       avatarUrl,
        //       nickName,
        //       userInfo
        //     })
        //   })
      // })
      // .catch(err => {
      //   wx.showToast({
      //     title: '登录失败',
      //     icon: "error",
      //     duration: 1500,
      //   });
      // })
      // .finally(() => {
      //   console.log(avatarUrl, nickName, userInfo);
      // })
  })
}