import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'

import iView from 'iview'
import './theme/iview.less'
// import 'iview/dist/styles/iview.css'

Vue.use(iView)

Vue.$api = Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
