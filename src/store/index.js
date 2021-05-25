import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginShow: true,
    registerShow: false, //注册页面开关
    findNumber:false,
    againOrder: false,
    checkOrder: false,
    indexs: 0,
    // back: false,
    addressIndex:0
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
