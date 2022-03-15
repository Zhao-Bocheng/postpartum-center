// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");
const Cloud = require('wx-server-sdk');

Cloud.init({
  env: Cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const phoneNumberSet = event.phoneNumberSet;
  const templateId = event.templateId;
  const templateParamSet = event.templateParamSet;

  const {secretId, secretKey, region, smsSdkAppId, signName, httpProfileEndPoint} = await getBaseConfigInfo();

  const SmsClient = tencentcloud.sms.v20210111.Client;
  const clientConfig = {
    credential: {
      secretId: secretId, // 数据库中提取
      secretKey: secretKey, // 数据库中提取
    },
    region: region, // 数据库中提取
    profile: {
      httpProfile: {
        endpoint: httpProfileEndPoint, // 从数据库中获取
      },
    },
  };
  
  const client = new SmsClient(clientConfig);

  const params = {
      PhoneNumberSet: phoneNumberSet,
      SmsSdkAppId: smsSdkAppId, // 从数据库中获取
      SignName: signName, // 从数据库中获取
      TemplateId: templateId,
      TemplateParamSet: templateParamSet,
  };

  const sendSmsRes = await client.SendSms(params);

  return sendSmsRes;
}

// smsType 取值
const BASE_CONFIG = "baseConfig";
// 基本配置信息所在集合名称
const BASE_CONFIG_DB = "tencent-sms";

// 从数据库获取SMS服务基本配置信息
async function getBaseConfigInfo() {
  const db = Cloud.database();

  const dbRes = await db.collection(BASE_CONFIG_DB).where({
    smsType: BASE_CONFIG,
  }).get();
  const dbData = dbRes.data;
  if(dbData.length === 0) {
    throw new Error("无法获取到SMS服务的基本配置信息");
  }
  // 基本配置信息
  const baseConfig = dbData[0];

  return baseConfig;
}


