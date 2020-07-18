import Vue from 'vue'
import App from './App.vue'
import ZhfUI from '../packages'
Vue.config.productionTip = false
Vue.use(ZhfUI)
new Vue({
  render: h => h(App)
}).$mount('#app')
