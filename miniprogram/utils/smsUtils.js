// 下发短信工具函数封装

import { REGISTER_CODE, LOGIN_CODE } from "./constants";

// 发送验证码短信
export function sendCode(smsType, phoneNumber) {
  return new Promise((resolve, reject) => {
    let sendCodeRes = null;
    let cloudFuncName = '';
    if(smsType === REGISTER_CODE) {
      cloudFuncName = "sendRegisterSms";
    }
    if(smsType === LOGIN_CODE) {
      cloudFuncName = "sendLoginSms";
    }

    wx.cloud.callFunction({
      name: cloudFuncName,
      data: {
        phoneNumber
      }
    }).then(res => {
      sendCodeRes = res.result;
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

// 发送注册验证码短信
export function sendRegisterCode(phoneNumber) {
  return new Promise((resolve, reject) => {
    sendCode(REGISTER_CODE, phoneNumber)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

// 发送登录验证码短信
export function sendLoginCode(phoneNumber) {
  return new Promise((resolve, reject) => {
    sendCode(LOGIN_CODE, phoneNumber)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}