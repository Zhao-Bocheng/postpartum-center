// 执行初始化操作的文件

// 项目基本配置信息
import config from "../config";
// 引入云环境初始化函数
import { cloudInit } from "./cloudUtils";
// 实例化腾讯地图API核心类
import QQMapSDK from "./qqMapInit";

export function init() {
  // 云环境初始化
  cloudInit(config.envId);

  // 返回一些全局数据
  return {
    config,
    QQMapSDK
  }
}
