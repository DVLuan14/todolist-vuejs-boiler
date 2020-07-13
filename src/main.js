import Vue from 'vue'
// global styles
import 'assets/css/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// middleware
import './middleware'

import * as filters from './utils/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

locale.use(lang)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
