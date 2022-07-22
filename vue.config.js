const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/',
  parallel: false,
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: false, // 关闭eslint代码检查terser-webpack-plugin
  // 是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  chainWebpack: (config) => {
    if (process.env.use_analyzer) {
      // 分析包
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  },
  configureWebpack: (config) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, './src'),
      '@c': path.resolve(__dirname, './src/components'),
      '@p': path.resolve(__dirname, './src/pages'),
    };
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css', 'html'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
        }),
      );
    } else {
      // 为开发环境修改配置...
    }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: process.env.NODE_ENV === 'production',
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData:
          '@import "~@/styles/var.scss";' +
          '@import "~@/styles/mixin.scss";' +
          '$VUE_APP_FONT_URL: "' +
          process.env.VUE_APP_BASE_IMG_URL +
          'font/";', // 全局的scss变量用于引入字体,
      },
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
  devServer: {
    disableHostCheck: true,
    port: 8080, // 端口号
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    overlay: {
      warnings: true,
      errors: false,
    },
    // proxy: {
    //   'xzy/': {
    //     target: 'http://192.168.3.101:8089/', // 目标地址
    //     changeOrigin: true, // 是否跨域
    //     logLevel: 'debug',
    //     pathRewrite: { // 重定向地址
    //       '^/xzy/': ''
    //     }
    //   }
    // } // 配置多个代理
  },
};
