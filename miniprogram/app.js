import {init} from "./utils/init";

// 执行初始化操作
const initGlobalDataObj = init();

App({
  onLaunch() {},

  // 将初始化函数返回的全局数据和这里的全局数据合并
  globalData: Object.assign({
    // 全局数据定义在这里
  }, initGlobalDataObj)
});