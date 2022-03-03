// pages/user/user.js
import { getUserProfile } from "../../utils/commonUtils";
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_NICK_NAME
} from "../../utils/constants";

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
    getUserProfile().then(res => {
      console.log(res);
      const {
        avatarUrl,
        nickName
      } = res.userInfo;
      that.setData({
        avatarUrl,
        nickName,
        userInfo: res.userInfo
      })
    }).catch(err => {
      console.log(err);
    })
  },
});