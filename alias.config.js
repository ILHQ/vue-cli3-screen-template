/**
 * webstorm的webpack映射文件
 * 应该雨vite。config中alias的配置保持一致
 * */
const resolve = (dir) => require('path').join(__dirname, dir);

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      '@c': resolve('src/components'),
      '@p': resolve('src/pages'),
    },
  },
};
