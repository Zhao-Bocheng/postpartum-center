// 常用工具函数封装

// 引入腾讯地图SDK
import QQMapSDK from "./qqMapInit";
// 引入节流函数
import throttle from "./throttle";

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
    wx.showLoading();
    wx.getUserProfile({
      desc: '获取您的头像和昵称',
      lang: "zh_CN"
    }).then(res => {
      console.log("commonUtils getUserProfile success", res);
      wx.hideLoading();
      resolve(res.userInfo);
    }).catch(err => {
      console.log("commonUtils getUserProfile fail", err);
      wx.hideLoading();
      wx.showToast({
        title: '获取失败',
        icon: "error",
        duration: 1500,
      })
      reject(err);
    })
  })
}

// 获取地理位置（详细地点名称）
export function getLocation() {
  return new Promise((resolve, reject) => {
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
        if(err.errMsg.includes("auth deny")) {
          showOpenSettingModal("无法获取地理位置", "为了功能的正常使用，请打开位置消息权限")
            .then(res => {
              // 缺少开放位置信息权限后获取定位操作
            })
            .catch(err => {
              reject(err);
            })
        }
      }
    })
  })
}