import config from "config";
import {
  cloudInit
} from "./utils/cloudUtils";
import QQMapWX from "./libs/qqmap-wx-jssdk.min";

// let QQMapSDK = null;

App({
  onLaunch() {
    // 云环境初始化
    cloudInit(config.envId);

    // 实例化腾讯地图API核心类
    // QQMapSDK = new QQMapWX({
    //   key: config.qqMapKey // 必填
    // });
  },

  onShow() {
    // QQMapSDK.reverseGeocoder({
    //   success(res, data) {
    //     console.log(res);
    //     console.log(data);
    //   }
    // })
  },

  globalData: {
    config,
    QQMapSDK: new QQMapWX({
      key: config.qqMapKey // 必填
    }),
  },
});