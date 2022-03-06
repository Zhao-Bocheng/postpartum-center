// pages/user/user.js
import { getOpenData } from "../../utils/cloudUtils";
import {
  getLocation,
  getUserProfile
} from "../../utils/commonUtils";
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
    console.log(getApp().globalData);
    const _this = this;
    // getLocation()
    //   .then(res => {
    //     console.log("user.js getLocation success", res);
    //     _this.setData({
    //       address: res.formatted_addresses.recommend.split("(")[0],
    //     })
    //   })
    //   .catch(err => {
    //     console.log("user.js getLocation fail", err);
    //   })
  },

  // 获取头像和昵称
  onWXLogin() {
    const _this = this;
    getUserProfile().then(res => {
      console.log(res);
      const {
        avatarUrl,
        nickName
      } = res;
      _this.setData({
        avatarUrl,
        nickName,
        userInfo: res
      })
    }).catch(err => {
      console.log(err);
    })
  },
});