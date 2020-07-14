import Vue from 'vue';
import VueRouter from "vue-router";
import Home from "./views/Home";
import WishList from "./views/WishList";


Vue.use(VueRouter)
export default new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', name:'home', component: Home},
        {path: '/wl', name:'wl', component: WishList},
    ]
})