// 防抖函数
export default function debounce(func, wait, immediate) {
  var timeout;
  var args;
  var context;
  var timestamp;
  var result;

  const later = function later() {
    const last = +(new Date()) - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  };

  return function debounced() {
    context = this;
    args = arguments;
    timestamp = +(new Date());

    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }

    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}