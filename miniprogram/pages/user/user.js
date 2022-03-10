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
    
    sendLoginCode("18344367175")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("error", err);
      })

    // wx.cloud.database().collection("users").add({
    //   data: {
    //     avatarUrl: "https://......",
    //     cith: "惠州",
    //     province: "广东",
    //     nickName: "abc",
    //     gender: "1",
    //   }
    // }).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log("error", err);
    // })
  }
});