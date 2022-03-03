// pages/user/user.js
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_NICK_NAME
} from "../../utils/constants";
import {
  showOpenSettingModel
} from "../../utils/commonUtils";
import {
  getMultiOpenData,
  getOpenData
} from "../../utils/cloudUtils.js";

Page({
  data: {
    avatarUrl: DEFAULT_AVATAR_URL,
    nickName: DEFAULT_NICK_NAME,
    userInfo: null,
  },

  onLoad() {
    // wx.cloud.callFunction({
    //   name: "testFunction",
    // }).then(res => {
    //   console.log(res);
    // })
  },

  // 获取头像和昵称
  onWXLogin() {
    const that = this;
    wx.showLoading();
    wx.getUserProfile({
      desc: "获取您的头像和昵称",
      success(res) {
        // console.log(res);
        wx.hideLoading();
        const {
          avatarUrl,
          nickName
        } = res.userInfo;
        that.setData({
          avatarUrl,
          nickName,
          userInfo: res.userInfo,
        })
      },
      fail(err) {
        console.error(err);
        wx.hideLoading();
        wx.showToast({
          title: "无法获取",
          icon: "error",
          duration: 2000,
        });
      },
    });
  },

  // onGetPhoneNumber(e) {
  //   console.log(e);
  // },

  // onChooseAvatar(e) {
  //   console.log(e);
  //   const { avatarUrl } = e.detail;

  //   this.setData({
  //     avatarUrl,
  //   });
  // },

  // onLoad() {},

  // onAuthLocation() {
  //   wx.authorize({
  //     scope: "scope.userLocationBackground",
  //     success(res) {
  //       console.log(res);
  //     },
  //     fail(err) {
  //       showOpenSettingModel();
  //     },
  //   });
  //   // .then((res) => {
  //   //   console.log(res);
  //   // })
  //   // .catch((err) => {
  //   //   console.log(err);
  //   // });
  // },

  // onOpenSetting(e) {
  //   wx.openSetting({
  //     withSubscriptions: true,
  //     success(res) {
  //       console.log(res);
  //     },
  //   });
  // },

  // onConfirmNickName(e) {
  //   // console.log(e);
  //   const { value: nickName } = e.detail;
  //   console.log(nickName);
  //   this.setData({
  //     nickName,
  //   });
  // },

  // onGetUserProfile(e) {
  //   const that = this;

  //   // 获取头像和昵称
  //   wx.getUserProfile({
  //     desc: "获取你的头像和昵称",
  //     success: function (res) {
  //       console.log(res);
  //       const { avatarUrl, nickName } = res.userInfo;
  //       that.setData({
  //         avatarUrl,
  //         nickName,
  //       });
  //     },
  //     fail: function (res) {
  //       console.log(res);
  //     },
  //   });

  //   // 直接返回匿名信息（无弹窗）
  //   // wx.getUserInfo({
  //   //   desc: '获取你的头像和昵称',
  //   //   success: function(res) {
  //   //     console.log(res);
  //   //   },
  //   //   fail: function(res) {
  //   //     console.log(res);
  //   //   }
  //   // })

  //   // 如需获取用户身份标识符只需要调用wx.login接口即可
  //   // wx.login({
  //   //   timeout: 2000,
  //   //   success: function (res) {
  //   //     console.log(res);
  //   //   },

  //   //   fail: function (res) {
  //   //     console.log(res);
  //   //   },
  //   // });
  // },

  onGetWXRun(e) {
    Promise.allSettled([
      wx.getWeRunData(),
      wx.getUserProfile({
        desc: '获取用户头像和昵称',
      }),
    ])
      .then(results => {
        console.log(results);
        const res1 = results[0].value ? results[0].value : results[0].reason;
        const res2 = results[1].value ? results[1].value : results[1].reason;
        getMultiOpenData({
          userProfile: res2.cloudID,
          weRunData: res1.cloudID,
          userProfile1: res2.cloudID,
          weRunData1: res1.cloudID,
          userProfile2: res2.cloudID,
          weRunData2: res1.cloudID,
          userProfile3: res2.cloudID,
          weRunData3: res1.cloudID,
          test: "123"
        }).then((res) => {
          console.log(res);
        });
      })
      .catch(err => {
        console.log(err);
      })
  },

  // onCheckSession() {
  //   wx.checkSession({
  //     success: (res) => {
  //       console.log(res);
  //     },
  //     fail(err) {
  //       console.log(err);
  //     },
  //   });
  // },
});