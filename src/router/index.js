/*
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-12-20 16:38:37
 * @Description : 路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  /*
   * 前面加"/"表示绝对路径，不加"/"表示相对路径
   * 一般嵌套路由中的子路由不需要加"/"，它会在父路由后自动加上"/子路由"
   * 比如父 "/father"，子 "child"，要想访问子路由，跳转链接需要写成 "/father/child"
   */

  // 首页
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home'),
    meta: ['首页']
  },

  // 开发者
  {
    path: '/set-developer',
    name: 'set-developer',
    component: () => import('@/views/set/set-developer'),
    meta: ['开发者']
  },

  // 修改传感器K值
  {
    path: '/set-k',
    name: 'set-k',
    component: () => import('@/views/set/set-k'),
    meta: ['修改传感器K值']
  },

  // 3个常数项：等高常数、到A常数、到B常数
  {
    path: '/set-cs',
    name: 'set-cs',
    component: () => import('@/views/set/set-cs'),
    meta: ['3个常数项']
  },

  // 修改中心距评定上下限
  {
    path: '/set-centerSpacingMinMax',
    name: 'set-centerSpacingMinMax',
    component: () => import('@/views/set/set-centerSpacingMinMax'),
    meta: ['修改中心距评定上下限']
  },

  {
    path: '/refresh',
    name: 'refresh',
    component: () => import('@/views/refresh')
  },

  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  /* 自定义路由切换时页面如何滚动 */
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 } // 回到顶部
  }
})

export default router
