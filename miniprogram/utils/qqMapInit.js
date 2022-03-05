import config from "../config";
import QQMapWX from "../libs/qqmap-wx-jssdk.min";

const QQMapSDK = new QQMapWX({
  key: config.qqMapKey // 必填
});

export default QQMapSDK;