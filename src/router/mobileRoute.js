import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import('../mobile/mobileLogin')
const register = () => import('../mobile/mobileRegister')
const mobileIndex = () => import('../mobile/mobileIndex')
const historyPage = () => import('../mobile/commonAssembly/historyPage')

const mobileRoutes = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/mobileIndex',
    name: 'mobileIndex',
    component: mobileIndex,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/historyPage',
    name: 'historyPage',
    component: historyPage,
  },
]

export default mobileRoutes
