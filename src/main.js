/*
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-09-25 09:24:17
 * @Description : 渲染进程入口
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/************************************************************/
/* 引入Element-UI组件库 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* 引入Echarts图形库 */
import * as Echarts from 'echarts'
/* 引入moment时间日期库 */
import moment from 'moment'
/* 引入封装好的axios */
import { instance } from '@/api/index.js'
// /* 引入样式重置表和acss，建议放最后 */
import '@/style/cover-output.scss'

/************************************************************/
/* 使用Element-UI组件库 */
Vue.use(ElementUI)
/* 使用Echarts图形库 */
Vue.prototype.$echarts = Echarts
/* 使用moment时间日期库 */
Vue.prototype.$moment = moment
/* 使用封装好的axios */
Vue.prototype.$axios = instance

/************************************************************/
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
