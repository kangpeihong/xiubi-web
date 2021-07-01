import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Order from '../views/order'
import Register from '../views/register'
import Modify from '../views/modifypasw'
import Modifyifo from '../views/modifyinfo'
import Modifyadd from '../views/modifyadd'

import mobileRoutes from './mobileRoute'
// import history from '../views/historyPage'

//判断是否为移动端

function isPhone() {
  let flag
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
  ) {
    flag = true
  } else {
    flag = false
  }
  return flag
}

let ifPhoneStatus = isPhone()
console.log('ifphone', ifPhoneStatus)

const history = () => import('../views/historyPage')

const findNumber = () => import('../views/findNumber')

const changePage = () => import('../views/module/changePage')

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}
const route = [
  {
    path: '/login',
    component: !ifPhoneStatus
      ? (resolve) => require(['../views/login'], resolve)
      : (resolve) => require(['../mobile/mobileLogin'], resolve),
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  // {
  //   path: '/register',
  //   component: Register,
  // },
  {
    path: '/register',
    component: !ifPhoneStatus
      ? (resolve) => require(['../views/register'], resolve)
      : (resolve) => require(['../mobile/mobileRegister'], resolve),
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

let routes
if (ifPhoneStatus) {
  routes = mobileRoutes
} else {
  routes = route
}

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  window.addEventListener('load', function() {
    // 移动端跳转页面
    if (ifPhoneStatus) {
      // debugger
      // router.addRoutes(mobileRoute)
      next('/login')
      console.log('this55', router)
    } else {
      if (
        to.path === '/mobileIndex' ||
        to.path === '/historyPage' ||
        to.path === '/login' ||
        to.path === '/findnumber' ||
        to.path === '/register'
      ) {
        next('/')
        // 列表页面的路由
      }
    }
  })
  // 1.登录页面直接放行
  if (
    to.path === '/mobileIndex' ||
    to.path === '/historyPage' ||
    to.path === '/login' ||
    to.path === '/register' ||
    to.path === '/' ||
    to.path === '/findnumber'
  ) {
    // debugger
    next()
    return
  }

  // 2.非登录页面 ，需要校验

  const token = window.sessionStorage.getItem('user-token')

  if (token) {
    next()
  } else {
    next('/login')
  }

  //   router.beforeEach((to, from, next) => {
  //     // to将要访问的路径
  //     // from代表从哪个路径跳转而来
  //     // next 是一个函数，表示放行
  //     // next() 放行， next('/login')强制跳转
  //     debugger
  //     if (to.path === '/login') return next();
  //     const tokenStr = window.sessionStorage.getItem('user-token');  //判断是否存在token
  //     if (!tokenStr) return next('/login');
  //     next();
  // });
})
export default router
