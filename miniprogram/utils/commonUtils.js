// 常用工具函数封装

// 显示“打开设置”弹窗
export function showOpenSettingModel(
  title = "部分权限被禁止使用",
  content = "请允许打开设置修改权限，以便功能正常使用"
) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: true,
    cancelText: "取消",
    confirmText: "打开设置",
    success(res) {
      console.log("commonUtils authLocationModel", res);
      if (res.confirm) {
        wx.openSetting({
          withSubscriptions: true,
          success(res) {
            console.log("commonUtils authLocationModel", res);
          },
          fail(err) {
            console.log("commonUtils authLocationModel", res);
          },
        });
      }
      if (res.cancel) {}
    },
    fail(err) {
      console.log("commonUtils authLocationModel err", err);
    },
  });
}

// 获取头像和昵称
export function getUserProfile() {
  return new Promise((resolve, reject) => {
    wx.showLoading();
    wx.getUserProfile({
      desc: '获取您的头像和昵称',
      lang: "zh_CN"
    }).then(res => {
      wx.hideLoading();
      resolve(res.userInfo);
    }).catch(err => {
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