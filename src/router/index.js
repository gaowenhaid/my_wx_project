import modules from './modules/index.js'
import Vue from 'vue'
import Router from 'uni-simple-router'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [...modules]
})
export default router

