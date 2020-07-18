import Realm from './realm/index.vue'
import Price from './price/index.vue'
import Fence from './fence/index.vue'
import Cell from './cell/index.vue'
import Counter from './counter/index.vue'
// 存储组件列表
const components = [Realm, Price, Fence, Cell, Counter]
const install = function(Vue) {
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install
}
