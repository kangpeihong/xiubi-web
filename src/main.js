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
import './assets/iconfont/iconfont.css'
import utils from './assets/js/utils'
import request from './assets/js/request'
import api from './assets/js/api'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueLazyLoad from 'vue-lazyload' // 懒加载
// import Viewer from 'v-viewer'
import './utils/permission'
import 'viewerjs/dist/viewer.css'

import Print from 'vue-print-nb'
// Vue.use(Viewer);

//TODO: 判断是否为移动端

if (
  navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
) {
  require('./utils/rem.js')
} else {
}

window.onload = function() {
  //ios禁止双击缩放
  document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  var lastTouchEnd = 0
  document.addEventListener(
    'touchend',
    function(event) {
      var now = new Date().getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    false
  )
  //ios禁止双指手势操作
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault()
  })
}

Vue.use(Vant)
Vue.use(Print)
Vue.use(animated)
Vue.use(htmlToPdf)
Vue.use(ElementUi)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$utils = utils
Vue.prototype.$request = request
Vue.prototype.$api = api

if (window.ActiveXObject || 'ActiveXObject' in window) {
  require('./assets/css/ie.less')
}
Vue.use(VueLazyLoad, {
  error: '../static/img/tzb.jpg', // 加载错误的图片
  loading: '../static/img/tzb.jpg', // 加载时的图片
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
