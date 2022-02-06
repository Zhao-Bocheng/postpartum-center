### 基本概念：    
- 实例
  ```
  echarts.init(...)
  ```

- series, 系列，一组数值以及他们映射成的图。一个 系列 包含的要素至少有：一组数值、图表类型（series.type）、以及其他的关于这些数据如何映射成图的参数

- 组件，echarts 中各种内容，被抽象为“组件”。如 yAxis, xAxis, toolTip, legend, ......

- options,  表述了 数据、数据如何映射成图形、交互行为

- 组件定位，left/right/width/top/bottom/height

- 坐标系

> https://echarts.apache.org/zh/tutorial.html#ECharts%20%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5%E6%A6%82%E8%A7%88

### 加载数据
阅读文档后得出的方案：在数据未加载出来前可以使用`myChart.showLoading()`，等到数据获取到之后再`myChart.hideLoading()`并`myChart.setOption(...)`把数据填入。

实际上可以先通过`myChart.setOption(...)`建立一个空的坐标系，等数据获取到之后再独立地把数据填入，也就是说`options`实际上是可以分开多次填入的

> https://echarts.apache.org/zh/tutorial.html#%E5%BC%82%E6%AD%A5%E6%95%B0%E6%8D%AE%E5%8A%A0%E8%BD%BD%E5%92%8C%E6%9B%B4%E6%96%B0