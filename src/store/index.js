// 文档地址
// https://vuex.vuejs.org/zh-cn/
import Vue from 'vue';
import Vuex from 'vuex';
import index from './modules/index';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    index,
  },
});
