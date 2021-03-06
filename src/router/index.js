import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login'
// import Order from '../views/order'
// import Register from '../views/register'
// import Modify from '../views/modifypasw'
// import Modifyifo from '../views/modifyinfo'
// import Modifyadd from '../views/modifyadd'

import mobileRoutes from './mobileRoute'
import pcRoute from './pcRoute'
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

// const history = () => import('../views/historyPage')

// const findNumber = () => import('../views/findNumber')

// const changePage = () => import('../views/module/changePage')

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}
// const route = [
//   {
//     path: '/login',
//     component: !ifPhoneStatus
//       ? (resolve) => require(['../views/login'], resolve)
//       : (resolve) => require(['../mobile/mobileLogin'], resolve),
//   },
//   {
//     path: '/order',
//     name: 'Order',
//     component: Order,
//   },
//   // {
//   //   path: '/register',
//   //   component: Register,
//   // },
//   {
//     path: '/register',
//     component: !ifPhoneStatus
//       ? (resolve) => require(['../views/register'], resolve)
//       : (resolve) => require(['../mobile/mobileRegister'], resolve),
//   },

//   {
//     path: '/findnumber',
//     component: findNumber,
//   },
//   {
//     path: '/modify',
//     component: Modify,
//   },
//   {
//     path: '/modifyinfo',
//     component: Modifyifo,
//   },
//   {
//     path: '/historyPage',
//     component: history,
//   },
//   {
//     path: '/changePage',
//     name: 'changePage',
//     component: changePage,
//     meta: {
//       keepAlive: true, // 需要缓存
//     },
//   },
// ]

let routes
if (ifPhoneStatus) {
  // 移动端路由
  routes = mobileRoutes
} else {
  // routes = route

  // pc端路由
  routes = pcRoute
}

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  window.addEventListener('load', function() {
    if (ifPhoneStatus) {
      // 移动端页面刷新时跳转页面
      next('/err')
      // if (to.path === '/login') {
      //   next()
      //   // 列表页面的路由
      // }
    } else {
      // pc端页面刷新时跳转页面
      if (
        to.path === '/login' ||
        to.path === '/findnumber' ||
        to.path === '/register'
      ) {
        next()
        // 列表页面的路由
      }

      const token = window.sessionStorage.getItem('user-token')
      if (token) {
        next()
      } else {
        next('/')
      }
    }
  })
  // 1.登录页面直接放行

  // vue页面跳转

  if (ifPhoneStatus) {
    // vue  移动端页面跳转
  } else {
    // vue pc端页面跳转
    if (
      to.path === '/login' ||
      to.path === '/register' ||
      to.path === '/' ||
      to.path === '/findnumber'
    ) {
      // debugger
      next()
      return
    }
  }

  // if (
  //   to.path === '/login' ||
  //   to.path === '/register' ||
  //   to.path === '/' ||
  //   to.path === '/findnumber'
  // ) {
  //   // debugger
  //   next()
  //   return
  // }

  // 2.非登录页面 ，需要校验
  const token = window.sessionStorage.getItem('user-token')
  if (token) {
    next()
  } else {
    if (ifPhoneStatus) {
      next()
    } else {
      next('/')
    }
  }
})
export default router
