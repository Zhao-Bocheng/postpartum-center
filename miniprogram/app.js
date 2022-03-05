import config from "config";
import {
  cloudInit
} from "./utils/cloudUtils";
import QQMapSDK from "./utils/qqMapInit"

App({
  onLaunch() {
    // 云环境初始化
    cloudInit(config.envId);
  },

  globalData: {
    config,
    // 实例化腾讯地图API核心类
    QQMapSDK,
  },
});