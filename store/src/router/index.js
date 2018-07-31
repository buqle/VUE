import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const loggedIn = () => {
  const accessToken = localStorage.getItem('didadi-store-token')
  const expireAt = localStorage.getItem('didadi-store-token-expire-at') * 1000
  const timestamp = Date.parse(new Date())
  /*
  console.log('access_token:' + accessToken)
  console.log('expireAt:' + expireAt)
  console.log('timestamp:' + timestamp)
  */
  return !!((accessToken && timestamp < expireAt))
}

const ifNotAuthenticated = (to, from, next) => {
  if (!loggedIn()) {
    next()
    return
  }
  next({
    path: '/me'
  })
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'store' }
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: ifNotAuthenticated,
      component: () => import('@/view/Login.vue')
    },
    {
      path: '/wechat-login',
      name: 'wechat-login',
      meta: {
        requiredLogin: true
      },
      component: () => import('@/view/WechatLogin.vue')
    },
    {
      path: '/store',
      name: 'store',
      component: () => import('@/view/Store.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/view/Product.vue')
    },
    {
      path: '/me',
      name: 'me',
      meta: {
        requiredLogin: true
      },
      component: () => import('@/view/Me.vue')
    },
    {
      path: '/order',
      name: 'order_all',
      meta: {
        requiredLogin: true
      },
      component: () => import('@/view/Order.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin) {
    if (loggedIn()) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
