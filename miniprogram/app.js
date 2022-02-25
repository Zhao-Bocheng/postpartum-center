import config from "config";
import { cloudInit } from "./utils/cloudUtils";

App({
  onLaunch() {
    // 云环境初始化
    cloudInit(config.envId);
  },

  globalData: {
    config: require("config"),
  },
});
