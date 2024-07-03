import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Login from '../views/Login.vue'
import Main from '../views/main.vue'
Vue.use(VueRouter)

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace;

// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'登录'
    }
  },
  {
    path:'/',
    component: Main,
    redirect: '/chat',
    children:[
      {
        path: '/chat',
        name: 'chat',
        component: () => import('@/views/chat.vue'),
        hidden: true,
        meta: { title: '新的创作',keepAlive:true },
      },
      {
        path: '/user-center',
        name: 'userCenter',
        component: () => import('@/views/userCenter.vue'),
        hidden: true,
        meta: { title: '个人中心'},
      },
      {
        path: '/cost',
        name: 'cost',
        component: () => import('@/views/cost.vue'),
        hidden: true,
        meta: { title: '费用中心'},
      },
    ]
  }

]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

console.log(process.env.BASE_URL)

const whiteList = ['/login']; // 添加路由白名单
//路由判断
router.beforeEach(async (to, from, next) => {
  const token =  window.localStorage.getItem('token');
  // 页面刷新时，重新赋值token
  // if(token){
  //   store.dispatch("setToken",token);
  //   next();
  // }else{
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // 在白名单内直接放行
  //     next();
  //   } else {
  //     // 其他没有访问权限的页面将被重定向到登录页面。
  //     next(`/login?redirect=${to.path}`);
  //   }
  // }

  if(to.path == from.path ){
    // 让 列表页 即不缓存，刷新
    to.meta.keepAlive = false; 
  }
  next()

})




router.afterEach((to) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  window.scrollTo(0,0);

})

export default router
