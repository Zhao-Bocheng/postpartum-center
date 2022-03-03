// 执行初始化操作的文件
import config from "../config";
import { cloudInit } from "cloudUtils";
import QQMapWX from "../libs/qqmap-wx-jssdk.min"

export function init() {
  // 云环境初始化
  cloudInit(config.envId);
}
