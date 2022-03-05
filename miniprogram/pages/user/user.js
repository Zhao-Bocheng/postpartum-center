// pages/user/user.js
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

  onShow() {
    const _this = this;
    // getLocation().then(res => {
    //   console.log(res);
    //   _this.setData({
    //     address: res.formatted_addresses.recommend.split("(")[0],
    //   })
    // })
    getLocation();
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

  onGetLocation() {
    const _this = this;
    getLocation().then(res => {
      console.log(res);
      _this.setData({
        address: res.formatted_addresses.recommend.split("(")[0],
      })
    }).catch(err => {
      console.log(err);
    })
  },
});