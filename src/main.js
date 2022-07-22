import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Scroll from '@/components/Scroll/index';
import VueXss from 'vue-xss';
import Navigation from 'vue-navigation';
import '@/styles/global.scss';
import { fullImgUrl } from '@/lib/utils';
import { VueXssOptions } from '@/lib/common';

Vue.use(VueXss, VueXssOptions);
Vue.use(Navigation, { router });
Vue.config.productionTip = false;
Vue.prototype._filePrefix = (url, type = '') => {
  if (type === 'user') {
    url = url || 'production/default-avatar.png';
  }
  if (type === 'unit') {
    url = url || 'production/default-unit.png';
  }
  return fullImgUrl(url);
};

Vue.component('Scroll', Scroll);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
