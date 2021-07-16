import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: sessionStorage.getItem('user-id')
      ? JSON.parse(sessionStorage.getItem('user-id'))
      : '',
    loginShow: true,
    registerShow: false, //注册页面开关
    findNumber: false,
    againOrder: false,
    checkOrder: false,
    billOrAddress: sessionStorage.getItem('billOrAddress')
      ? JSON.parse(sessionStorage.getItem('billOrAddress'))
      : '',
    indexs: 0,
    // back: false,
    addressIndex: 0,
    menuLeft: false,
    menuRight: false,
  },
  mutations: {
    setMenuLeft(state, data) {
      state.menuLeft = data
    },
    setMenuRight(state, data) {
      state.menuRight = data
    },
  },
  actions: {},
  modules: {},
})
