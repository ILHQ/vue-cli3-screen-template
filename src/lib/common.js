import { timeFormat } from '@/lib/utils';

/**
 * 向下滚动条触底
 * */
export const scrollTouchBottom = (function () {
  let scrollTop = 0;
  return function (e) {
    const trendDown = e.target.scrollTop > scrollTop; // 是否是向下滚动的趋势
    if (trendDown) {
      scrollTop = e.target.scrollTop;
      const scrollHeight = e.target.scrollHeight;
      const offsetHeight = Math.ceil(e.target.getBoundingClientRect().height);
      const currentHeight = scrollTop + offsetHeight + 10;
      return currentHeight >= scrollHeight;
    }
    scrollTop = e.target.scrollTop;
    return false;
  };
})();

/**
 * 去掉链接中的指定参数
 * @param {string} href
 * @param {string} param
 * */
export function removeHrefParam(href, param) {
  if (href.indexOf(`&${param}=`) !== -1) {
    const list = href.split('&');
    let index = '';
    list.forEach((item, inx) => {
      if (item.indexOf(`${param}=`) === 0) {
        index = inx;
      }
    });
    list.splice(index, 1);
    return list.join('&');
  } else if (href.indexOf(`?${param}=`) !== -1) {
    const list1 = href.split('?');
    const list2 = list1[1].split('&');
    list2.splice(0, 1);
    return list1[0] + '?' + list2.join('&');
  }
  return href;
}

/**
 * ios 时间格式化成 yyyy-MM-dd
 * */
export function iosTimeFormatter(time, fmt = 'yyyy-MM-dd') {
  if (!time) {
    return '';
  }
  return timeFormat(new Date(time.replace(/-/g, '/')), fmt);
}

/**
 * 图片压缩
 * @param {object} img image对象
 * @param {string} type 类型
 * @param {number} maxWidth 最大宽度
 * @param {number} maxHeight 最大高度
 * */
export function resize(img, type, maxWidth, maxHeight) {
  const canvas = document.createElement('canvas');
  let width = img.width;
  let height = img.height;
  // eslint-disable-next-line camelcase
  const mWidth = !isNaN(maxWidth) ? maxWidth : 0;
  // eslint-disable-next-line camelcase
  const mHeight = !isNaN(maxHeight) ? maxHeight : 0;
  // 在这里图片是等比例缩放的，调用方法时填入图片允许的最大宽度或者是最大的高度
  // 如果最大宽度为0 则按照最大高度固定，宽度自适应的方式来实现
  // 如果是最大高度为0，则按照最大的宽度来实现
  if (mWidth === 0) {
    if (height > mHeight) {
      width = Math.round((width *= mHeight / height));
      height = mHeight;
    }
  }
  if (mHeight === 0) {
    if (width > mWidth) {
      height = Math.round((height *= mWidth / width));
      width = mWidth;
    }
  }
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  type = type === 'jpg' ? 'jpeg' : type;
  return canvas.toDataURL('image/' + type, 0.3); // 这里的0.3值的是图片的质量
}

/**
 * 判断是否在河南
 * */
export function isOnHeNan(administrativeArea) {
  return administrativeArea ? administrativeArea.split(',').includes('41') : false;
}

/**
 * 水印图片
 * */
export function watermark() {
  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 200;
  const canvas2d = canvas.getContext('2d');
  canvas2d.rotate((-20 * Math.PI) / 180);
  canvas2d.font = '14px Vedana';
  canvas2d.fillStyle = 'rgba(0, 0, 0, 0.2)';
  canvas2d.textAlign = 'left';
  const x = 0;
  let y = 85;
  const interval = 80;
  for (let i = 0; i < arguments.length; i++) {
    canvas2d.fillText(arguments[i], x, y); // 绘制水印文案
    y += interval; // 设置每行间隔
  }
  return canvas.toDataURL('image/png');
}

/**
 * xss攻击过滤标签和属性
 * */
export function VueXssOptions() {
  return {
    whiteList: {
      // 白名单
      div: ['style', 'class'],
      img: ['src', 'style', 'width', 'height', 'class'],
      p: ['style', 'class'],
      span: ['style', 'class'],
      i: ['class'],
    },
    stripIgnoreTag: true, // 去掉不在白名单上的标签   true：去掉不在白名单上的标签
    stripIgnoreTagBody: [], // 去掉不在白名单上的标签及标签体   ['tag1', 'tag2']：仅去掉指定的不在白名单上的标签
  };
}
