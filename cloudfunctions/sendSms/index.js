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

  const SmsClient = tencentcloud.sms.v20210111.Client;
  const clientConfig = {
    credential: {
      secretId: "AKID61g4B1buwg9MIxqTqwlKbbKmxrTothFY", // 数据库中提取
      secretKey: "5tQgfNnwoQknZ4JHyPZS4OSFkyvbz6wV", // 数据库中提取
    },
    region: "ap-guangzhou", // 数据库中提取
    profile: {
      httpProfile: {
        endpoint: "sms.tencentcloudapi.com",
      },
    },
  };
  
  const client = new SmsClient(clientConfig);

  const params = {
      PhoneNumberSet: phoneNumberSet,
      SmsSdkAppId: "1400641766", // 从数据库中获取
      SignName: "抖动的凶鸡个人公众号", // 从数据库中获取
      TemplateId: templateId,
      // 由一个函数生成参数
      TemplateParamSet: templateParamSet,
  };

  const sendSmsRes = await client.SendSms(params);

  return sendSmsRes;
}


