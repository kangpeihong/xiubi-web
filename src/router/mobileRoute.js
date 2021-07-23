import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import('../mobile/mobileLogin')
const register = () => import('../mobile/mobileRegister')
const mobileIndex = () => import('../mobile/mobileIndex')
const historyPage = () => import('../mobile/commonAssembly/historyPage')
const myOrder = () => import('../mobile/commonAssembly/myOrder')
const changePage = () => import('../mobile/commonAssembly/changePage')

const mobileRoutes = [
  {
    path: '/',
    redirect: '/mobileIndex',
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: login,
  // },
  {
    path: '/mobileIndex',
    name: 'mobileIndex',
    component: mobileIndex,
    meta: {
      keepAlive: true,
    },
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
  {
    path: '/changePage',
    name: 'changePage',
    component: changePage,
  },
]

export default mobileRoutes
