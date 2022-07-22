/**
 * webstorm的webpack映射文件
 * 应该雨vite。config中alias的配置保持一致
 * */
import path from 'path';
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      '@c': path.resolve(__dirname, 'src/components'),
      '@p': path.resolve(__dirname, 'src/pages'),
    },
  },
};
