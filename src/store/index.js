import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenStatus: sessionStorage.getItem('tokenStatus')
      ? JSON.parse(sessionStorage.getItem('tokenStatus'))
      : false, //登陆状态
    userId: sessionStorage.getItem('user-id')
      ? JSON.parse(sessionStorage.getItem('user-id'))
      : '',
    loginShow: false,
    registerShow: false, //注册页面开关
    findNumber: false,
    againOrder: false,
    checkOrder: false,
    billOrAddress: sessionStorage.getItem('billOrAddress')
      ? JSON.parse(sessionStorage.getItem('billOrAddress'))
      : '',
    indexs: sessionStorage.getItem('indexs')
      ? JSON.parse(sessionStorage.getItem('indexs'))
      : 0,
    // back: false,
    addressIndex: sessionStorage.getItem('addressIndex')
      ? JSON.parse(sessionStorage.getItem('addressIndex'))
      : 0,
    menuLeft: false,
    menuRight: false,
    redioActive: sessionStorage.getItem('redioActive')
      ? JSON.parse(sessionStorage.getItem('redioActive'))
      : 0,
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
