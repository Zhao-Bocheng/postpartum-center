// 云开发常用函数封装
// 以下皆采用 Promise 回调（不使用 async/await 语法以避免ES6转ES5后打包的包体积较大（一个 async 函数能让包大几KB）） 

/*
  用户登录操作参考
  https://developers.weixin.qq.com/community/develop/article/doc/00062eab0508684539cba249f59413
*/

// 云环境初始化函数
export function cloudInit(envId) {
  wx.cloud.init({
    env: envId,
    traceUser: true,
  });
}

// 某些接口不会直接返回私密数据，而是提供 cloudID 供云调用使用再进一步获取开放数据
// 获取单个开放数据
export function getOpenData(cloudID) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: "getOpenData",
      data: {
        openData: wx.cloud.CloudID(cloudID),
      }
    }).then(res => {
      console.log(res, "res");
      resolve(res.result.openData);
    }).catch(err => {
      reject(err);
    })
  })
}

// 获取多个开放数据
// 参数传入一个对象，需要给每个 cloudID 命名（返回的开放数据为对应名称）
export function getMultiOpenData(cloudIdList = {}) {
  return new Promise((resolve, reject) => {
    const openDataNames = Object.keys(cloudIdList);
    const cloudIDs = Object.values(cloudIdList);

    const cloudIDAmt = cloudIDs.length;
    let cloudIdObjList = {};
    let promises = [];

    for (let i = 0; i < cloudIDAmt; i++) {
      cloudIdObjList[openDataNames[i]] = wx.cloud.CloudID(cloudIDs[i]);

      // 按照微信小程序云开发规定，一次调用最多替换 5 个 cloudID
      // 为此需要如果 clouID 多于五个则需要多次调用云函数
      if ((i + 1) % 5 === 0 || i + 1 === cloudIDAmt) {
        promises.push(
          wx.cloud.callFunction({
            name: "getOpenData",
            data: cloudIdObjList
          })
        )
        cloudIdObjList = {};
      }
    }

    Promise.allSettled(promises)
      .then(results => {
        let res = {};
        results.forEach((result) => {
          res = Object.assign(res, result.value.result);
        })
        resolve(res);
      })

  })
}

// 所谓登录其实就是获取用户 openid ，这里使用的是云开发，没有复杂的鉴权流程
export function login() {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: "wxContext",
      data: {},
    }).then(res => {
      resolve(res.result.openid)
    })
  })
}