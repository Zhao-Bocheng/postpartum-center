// 常用工具函数封装

// 显示打开设置弹窗
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
      if (res.cancel) {
      }
    },
    fail(err) {
      console.log("commonUtils authLocationModel err", err);
    },
  });
}
