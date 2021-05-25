import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
import axios from 'axios'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import htmlToPdf from './utils/htmlToPdf'
import animated from 'animate.css'
import "./assets/iconfont/iconfont.css"
import utils from "./assets/js/utils";
import request from "./assets/js/request";
import api from './assets/js/api'
import VueLazyLoad from 'vue-lazyload'; // 懒加载
// import Viewer from 'v-viewer'

import 'viewerjs/dist/viewer.css'


import Print from 'vue-print-nb';
// Vue.use(Viewer);

Vue.use(Print);
Vue.use(animated)
Vue.use(htmlToPdf)
Vue.use(ElementUi)
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://server.xiubi.com.cn:8000'
Vue.prototype.$axios = axios
Vue.prototype.$utils = utils
Vue.prototype.$request = request
Vue.prototype.$api = api

if (window.ActiveXObject || 'ActiveXObject' in window) {
  require('./assets/css/ie.less')

}
Vue.use(VueLazyLoad, {
  error: '../static/img/tzb.jpg', // 加载错误的图片
  loading: '../static/img/tzb.jpg' // 加载时的图片
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
