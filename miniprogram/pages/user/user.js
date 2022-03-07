// pages/user/user.js
import {
  wxLogin
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

  onLoad() {},

  onWXLogin() {
    wxLogin();
  },
});