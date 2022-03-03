import Vue from 'vue'
import App from './App.vue'
import less from 'less'

import './assets/global.css'

Vue.use(less)
Vue.config.productionTip = false

let app = new Vue({
    render: (h) => h(App),
})

app.$mount('#app')
