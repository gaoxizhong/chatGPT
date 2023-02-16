import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Login from '../views/Login.vue'
import QAhome from '../views/QAhome.vue'     // 知识库疾病详情页
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/QAhome',
    name : 'QAhome',
    component: QAhome,
  },
]

// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
  store.dispatch("setToken",localStorage.getItem('token'));
}

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})


console.log(process.env.BASE_URL)
router.afterEach((to) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  window.scrollTo(0,0);

})

export default router
