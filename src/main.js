import Vue from 'vue'
import App from './App.vue'
import elemntUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; //element样式
//导入elemntUI组件
Vue.use(elemntUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
