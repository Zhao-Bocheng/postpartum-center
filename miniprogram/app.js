// const worker = wx.createWorker('workers/request/index.js')

// worker.postMessage({
//   msg: "Hello worker"
// })

// worker.terminate();

App({
  globalData: {
    worker: wx.createWorker('workers/request/index.js'),
  }
})