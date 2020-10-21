import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'
//导入vue-tree-with-tree-grid插件
import TreeTable from 'vue-table-with-tree-grid'

import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //最后必须return config
  return config
})
Vue.prototype.$http = axios

//引用element-ui组件
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI

Vue.config.productionTip = false

Vue.component('tree-table',TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
