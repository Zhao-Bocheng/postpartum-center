// pages/user/user.js
import { getUserProfile } from "../../utils/commonUtils";
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_NICK_NAME
} from "../../utils/constants";

const app = getApp();

Page({
  data: {
    avatarUrl: DEFAULT_AVATAR_URL,
    nickName: DEFAULT_NICK_NAME,
    userInfo: null,
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
    wx.getLocation({
      type: "gcj02",
      success(res) {
        // console.log(res);
        const {
          latitude,
          longitude
        } = res;

        const QQMapSDK = app.globalData.QQMapSDK;
        QQMapSDK.reverseGeocoder({
          location: {
            latitude,
            longitude,
          },
          success(res, data) {
            console.log(res);
            console.log(data);
            const {address} = res.result;
            _this.setData({
              address
            })
          }
        })
      }
    })
  },
});