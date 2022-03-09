// pages/user/user.js
import {
  wxLogin
} from "../../utils/commonUtils";
import {
  DEFAULT_AVATAR_URL,
  DEFAULT_NICK_NAME
} from "../../utils/constants";
import { sendLoginCode } from "../../utils/smsUtils";

Page({
  data: {
    avatarUrl: DEFAULT_AVATAR_URL,
    nickName: DEFAULT_NICK_NAME,
    userInfo: null,
  },

  onLoad() {},

  onWXLogin() {
    wxLogin();
  },

  onSendSms() {
    // sendSms("register", ["18344367175"]).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log("error", err);
    // })
    // wx.cloud.callFunction({
    //   name: "sendVertificationCodeSms",
    //   data: {
    //     smsType: "login",
    //     phoneNumberSet: ["18344367175"]
    //   }
    // }).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log("error", err);
    // })
    sendLoginCode("13246175715")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("error", err);
      })
  }
});