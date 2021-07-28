import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import('../views/login')
const register = () => import('../views/register')
const history = () => import('../views/historyPage')
const findNumber = () => import('../views/findNumber')
const changePage = () => import('../views/module/changePage')
const Modify = () => import('../views/modifypasw')
const Modifyifo = () => import('../views/modifyinfo')
const Order = () => import('../views/order')

const pcRoute = [
  {
    path: '/login',
    component: login,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },

  {
    path: '/register',
    component: register,
  },

  {
    path: '/findnumber',
    component: findNumber,
  },
  {
    path: '/modify',
    component: Modify,
  },
  {
    path: '/modifyinfo',
    component: Modifyifo,
  },
  {
    path: '/historyPage',
    component: history,
  },
  {
    path: '/changePage',
    name: 'changePage',
    component: changePage,
    meta: {
      keepAlive: true, // 需要缓存
    },
  },
]

export default pcRoute
