import Vue from 'vue'
import Router from 'vue-router'
import airplanes from '@/components/pages/airplanes'
import login from '@/components/pages/login'
import statusOverview from '@/components/pages/status/overview'
import notFound from '@/components/pages/notfound'
import auth from '@/components/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      alias: '/',
      name: 'login',
      component: login
    },
    {
      path: '/admin/airplanes',
      name: 'airplanes',
      component: airplanes
    },
    {
      path: '/admin/status/overview',
      name: 'statusOverview',
      component: statusOverview
    },
    {
      path: '*',
      component: notFound
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.fullPath.indexOf('/admin/') !== -1 && !auth.user.authenticated) {
    auth.user.redirect = to.fullPath
    next('/login')
  } else {
    next()
  }
})
export default router
