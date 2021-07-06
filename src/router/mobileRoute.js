import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import('../mobile/mobileLogin')
const register = () => import('../mobile/mobileRegister')
const mobileIndex = () => import('../mobile/mobileIndex')
const historyPage = () => import('../mobile/commonAssembly/historyPage')
const myOrder = () => import('../mobile/commonAssembly/myOrder')

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
  {
    path: '/myOrder',
    name: 'myOrder',
    component: myOrder,
  },
]

export default mobileRoutes
