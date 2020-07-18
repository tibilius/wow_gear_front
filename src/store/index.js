import Vue from 'vue'
import Vuex from 'vuex'
import dungeonItems from "./modules/dungeonItems";
import wishlist from "./modules/wishlist";
import common from "./modules/common";
import dungeon from "./modules/dungeon";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {dungeonItems, wishlist, common, dungeon}
})
