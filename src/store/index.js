import Vue from 'vue'
import Vuex from 'vuex'
import dungenItems from "./modules/dungenItems";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {dungenItems}
})
