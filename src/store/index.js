import Vue from 'vue'
import Vuex from 'vuex'
import dungenItems from "./modules/dungenItems";
import wishlist from "./modules/wishlist";
import common from "./modules/common";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {dungenItems, wishlist, common}
})
