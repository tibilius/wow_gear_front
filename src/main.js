import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store"
import Sortable from 'vue-sortable'

Vue.config.productionTip = false

var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)
Vue.use(Sortable)

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
