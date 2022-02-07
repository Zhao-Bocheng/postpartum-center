import * as echarts from '../../ec-canvas/echarts';

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '宝宝本周健康指标',
      // left: 'center'
    },
    legend: {
      data: ['A', 'B', 'C'],
      top: 30,
      left: 'center',
      z: 100
    },
    grid: {
      bottom: 0,
      left: 20,
      right: 20,
      // width: "90%",
      containLabel: true
    },
    // dataZoom: [{
    //   type: 'inside',
    //   start: 0,
    //   end: 50,
    //   zoomLock: true,
    // }],
    tooltip: {
      show: true,
      trigger: 'axis',
      z: 100,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      animation: false,
      smooth: false,
      data: [18, 36, 65, 30, 78, 40, 33],
      markLine: {
        symbol: "none",
        silent: false,
        lineStyle: {
          type: "dashed",
          color: "red",
        },
        emphasis: {
          lineStyle: {
            width: 1,	// hover时的折线宽度
          }
        },
        label: {
          position: 'insideEndTop',
          formatter: "A警戒线",
          color: "red"
        },
        data: [{
          // name: "A警戒线",
          yAxis: 50
        }]
      }
    }, {
      name: 'B',
      type: 'line',
      animation: false,
      smooth: false,
      data: [12, 50, 51, 35, 70, 30, 20],
      markLine: {
        symbol: "none",
        silent: false,
        lineStyle: {
          type: "dashed",
          color: "red",
        },
        emphasis: {
          lineStyle: {
            width: 1,	// hover时的折线宽度
          }
        },
        label: {
          position: 'insideEndTop',
          formatter: "B警戒线",
          color: "red"
        },
        data: [{
          yAxis: 80
        }]
      }
    }, {
      name: 'C',
      type: 'line',
      animation: false,
      smooth: false,
      data: [10, 30, 31, 50, 40, 20, 10],
      markLine: {
        symbol: "none",
        silent: false,
        lineStyle: {
          type: "dashed",
          color: "red",
        },
        emphasis: {
          lineStyle: {
            width: 1,	// hover时的折线宽度
          }
        },
        label: {
          position: 'insideEndTop',
          formatter: "C警戒线",
          color: "red"
        },
        data: [{
          yAxis: 10
        }]
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    recList: [{
      title: "宝宝爱吃的芝士面包4444444444",
      img: "https://636c-cloud1-9g50mutze1d19816-1309192011.tcb.qcloud.la/my-photo.png?sign=f82a25da3f43b5a8da039549e24ad15d&t=1644080779",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt natus officia laborum ullam quod, dolorum eveniet vitae, possimus omnis dolorem, reiciendis est. Placeat maiores facilis iste, consequatur iure ea nam! 没长牙的建议不要吃",
      tag: "美食",
      tagNum: 1,
      subTag: "宝宝爱吃",
      direct: "/pages/mother/mother"
    }, {
      title: "骨盆收缩产康课程",
      img: "https://636c-cloud1-9g50mutze1d19816-1309192011.tcb.qcloud.la/my-photo.png?sign=f82a25da3f43b5a8da039549e24ad15d&t=1644080779",
      desc: "一起提肛呀",
      tag: "产康",
      tagNum: 2,
      subTag: "康复运动"
    }],
    unusedList: [{
      id: "1",
      servName: "骨盆修复",
      servId: "100",
      servDesc: "收胯提臀，帮助子宫复位",
      servImg: "https://636c-cloud1-9g50mutze1d19816-1309192011.tcb.qcloud.la/my-photo.png?sign=f82a25da3f43b5a8da039549e24ad15d&t=1644080779"
    }, {
      id: "2",
      servName: "催乳",
      servId: "101",
      servDesc: "催乳wwwwwwwwww",
      servImg: "https://636c-cloud1-9g50mutze1d19816-1309192011.tcb.qcloud.la/my-photo.png?sign=f82a25da3f43b5a8da039549e24ad15d&t=1644080779",
      
    }, {
      id: "3",
      servName: "中药水洗头",
      servId: "102",
      servDesc: "洗头wwwwwwwwww",
      servImg: "https://636c-cloud1-9g50mutze1d19816-1309192011.tcb.qcloud.la/my-photo.png?sign=f82a25da3f43b5a8da039549e24ad15d&t=1644080779"
    }],
    currentSwiperItem: 0
  },

  onReady() {},

  unusedServiceSwiperChange(e) {
    this.setData({
      currentSwiperItem: e.detail.current,
    })
  }
});