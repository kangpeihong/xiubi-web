import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Order from '../views/order'
import Register from '../views/register'
import Modify from '../views/modifypasw'
import Modifyifo from '../views/modifyinfo'
import Modifyadd from '../views/modifyadd'
// import history from '../views/historyPage'
const history = () => import("../views/historyPage")

const findNumber = () => import("../views/findNumber")

const changePage = () => import("../views/module/changePage")


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const routes = [

  {

    path: '/login',
    component: Login
  },
  {
    path: '/order',
    name:'Order',
    component: Order,
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/findnumber',
    component: findNumber
  },
  {
    path: '/modify',
    component: Modify
  },
  {
    path: '/modifyinfo',
    component: Modifyifo
  },
  {
    path: '/historyPage',
    component: history
  },
  {
    path: '/changePage',
    name:'changePage',
    component: changePage,
    meta: {
      keepAlive: true // 需要缓存
    }
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
 
  window.addEventListener('load', function () {
  if (to.path === '/login' ||to.path === '/findnumber'|| to.path === '/register') {
    next('/')
    // 列表页面的路由
  }
})
  // 1.登录页面直接放行
  if (to.path === '/login' || to.path === '/register' || to.path === '/' || to.path === '/findnumber') {
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
