// 简单的节流函数
export default function throttle(func, wait) {
  let lastCallTime = 0;
  return function() {
    const time = new Date();
    const that = this;
    const _args = [...arguments];
    if(time - lastCallTime > wait) {
      lastCallTime = time;
      return func.apply(that, _args);
    }
  }
}