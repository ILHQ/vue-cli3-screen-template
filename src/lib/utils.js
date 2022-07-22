/**
 * 是否是微信浏览器
 */
export function isWxBrowser() {
  return /micromessenger/i.test(navigator.userAgent);
}

/**
 * 是否是安卓机
 */
export function isAndroid() {
  return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
}

/**
 * 是否是ios
 */
export function isIos() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * 微信内设置标题
 * @param {string} title 标题
 */
export function setWechatTitle(title) {
  document.title = title;
  if (isWxBrowser() && isIos()) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('src', '/static/favicon.ico');
    const iframeCallback = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', iframeCallback);
        document.body.removeChild(iframe);
      }, 0);
    };
    iframe.addEventListener('load', iframeCallback);
    document.body.appendChild(iframe);
  }
}

/**
 * 判断是否是手机
 * @param {string} str
 * @return {boolean} 是否是手机
 */
export function isPhoneNumber(str) {
  const phoneReg = /^1([3456789])\d{9}$/;
  return phoneReg.test(str);
}

/**
 * 判断是否是手机或电话号码
 * @param {string} str
 * @return {boolean} 是否是手机或电话号码
 */
export function isCallNumber(str) {
  const reg = /^(1([3456789])\d{9}|(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14})$/;
  return reg.test(str);
}

/**
 * 格式化成大概时间
 * @param {number} dateTimeStamp 时间戳
 * @return {string}大概时间
 */
export function timeDiff(dateTimeStamp) {
  dateTimeStamp *= 1000;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const now = new Date().getTime();
  const diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return '';
  }
  const monthC = diffValue / month;
  const weekC = diffValue / (7 * day);
  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;
  let result = '';
  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前';
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前';
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前';
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前';
  } else {
    result = '刚刚';
  }
  return result;
}

/**
 * 格式化成指定格式的时间
 * @param {Date | Number} time 时间戳
 * @param {string} fmt 格式化的格式
 * @return {string} 格式后的时间
 */
export function timeFormat(time, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!time) {
    return '';
  }
  if (isNumber(time)) {
    time = Math.floor(time);
    if (time.toString().length >= 13) {
      time = new Date(time);
    } else {
      time = new Date(time * 1000);
    }
  }
  const o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return fmt;
}

/**
 * 判断身份证是否正确
 * 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
 * @param {string} card
 * @return {boolean} 是否正确
 */
export function isCardNo(card) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card);
}

/**
 * 获取倒计时
 * @param {number} haveTime
 * @param {boolean} returnDate // 返回时分秒
 * @param {boolean} returnFalse // 失败时返回布尔值
 */
export function getCountTime(haveTime, returnDate = false, returnFalse = false) {
  if (typeof haveTime !== 'number') {
    return false;
  }
  haveTime = Math.floor(haveTime / 1000);
  if (haveTime <= 0) {
    if (returnFalse) {
      return false;
    }
    return ['00', '00', '00', '01'];
  }
  const day = Math.floor(haveTime / 3600 / 24);
  const hour = Math.floor(haveTime / 3600 - 24 * day);
  const minute = Math.floor((haveTime - 3600 * hour - 24 * 3600 * day) / 60);
  const second = haveTime % 60;
  const completeNum = (num) => (num < 10 ? '0' + num : num);
  if (returnDate) {
    return [day, hour, minute, second].map((item) => completeNum(item));
  }
  return `${day}天${hour}小时${minute}分钟${second}秒`;
}

/**
 * 补全图片地址
 * @param {string} url
 * @param {string} prefix
 */
export function fullImgUrl(url, prefix = process.env.VUE_APP_BASE_IMG_URL) {
  if (!url) {
    return url;
  }
  if (url.indexOf('http') !== -1) {
    return url;
  }
  return prefix + url;
}

/**
 * 获取随机色
 */
export function getRandomColor() {
  const rgb = [];
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length === 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
}

/**
 * 计算经纬度两点距离
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 * @return {number} 千米
 */
export function calcPointLength(lat1, lng1, lat2, lng2) {
  const radLat1 = (lat1 * Math.PI) / 180.0;
  const radLat2 = (lat2 * Math.PI) / 180.0;
  const a = radLat1 - radLat2;
  const b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2),
      ),
    );
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s;
}

/**
 * @param  {function} func
 * @param  {number} wait=1000
 */
export function throttle(func, wait = 1000) {
  // 利用闭包保存定时器和上次执行时间
  let previous; // 上次执行时间
  return function () {
    const context = this;
    const args = arguments;
    const now = +new Date(); // 转换成当前时刻时间戳
    if (previous && now < previous + wait) {
      // 周期之中
      return false;
    }
    previous = now;
    func.apply(context, args); // 严格模式闭包内层函数this === undefined
  };
}

/**
 * 防抖函数
 * @param method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
export function debounce(method, delay = 1000) {
  let timer = null;
  return function () {
    const self = this;
    const args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      method.apply(self, args);
    }, delay);
  };
}

/**
 * 属性判断
 */
const isPrototype = (data) => {
  return Object.prototype.toString.call(data).toLowerCase();
};

export function isArray(data) {
  return isPrototype(data) === '[object array]';
}

export function isJSON(data) {
  return isPrototype(data) === '[object object]';
}

export function isFunction(data) {
  return isPrototype(data) === '[object function]';
}

export function isString(data) {
  return isPrototype(data) === '[object string]';
}

export function isNumber(data) {
  return isPrototype(data) === '[object number]';
}

export function isUndefined(data) {
  return isPrototype(data) === '[object undefined]';
}

export function isNull(data) {
  return isPrototype(data) === '[object null]';
}

/**
 * num传入的数字，n需要的字符长度
 * @return {string | number} num
 * @return {number} n
 */
export function PrefixInteger(num, n = 2) {
  return (new Array(n).join(0) + num).slice(-n);
}

/**
 * px转换rem
 * */
export function pxToRem(px = 0, rem = process.env.VUE_APP_BASE_SIZE) {
  return px / rem;
}

/**
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
export function accDiv(arg1, arg2) {
  if (Number(arg2) === 0) {
    return 0;
  }
  let t1 = 0;
  let t2 = 0;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {}
  const r1 = Number(arg1.toString().replace('.', ''));
  const r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export function accMul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
}

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export function accSub(arg1, arg2) {
  let r1, r2;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
  const n = r1 >= r2 ? r1 : r2;
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export function accAdd(arg1, arg2) {
  let r1, r2;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  const c = Math.abs(r1 - r2);
  const m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    const cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', '')) * cm;
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm;
      arg2 = Number(arg2.toString().replace('.', ''));
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''));
    arg2 = Number(arg2.toString().replace('.', ''));
  }
  return (arg1 + arg2) / m;
}

/**
 * 时间差 返回天
 * */
export function dateDifference(sDate1, sDate2) {
  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);
  const dateSpan = sDate1 - sDate2;
  return Math.floor(dateSpan / (24 * 3600 * 1000));
}
