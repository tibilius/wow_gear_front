export default {
    actions: {
        queryExternalUpdate(ctx, routeQuery) {
            let parsed = []
            if (routeQuery.filters && (parsed = JSON.parse(routeQuery.filters)).length) {
                ctx.commit('updateFilters', parsed)
            }
            if (routeQuery.class && (parsed = JSON.parse(routeQuery.class)).length) {
                ctx.commit('updateSelectedClasses', parsed)
            }
            if (routeQuery.inventory_type && (parsed = JSON.parse(routeQuery.inventory_type)).length) {
                ctx.commit('updateSelectedInventoryType', parsed)
            }
            ctx.dispatch('fetchDungeonItems')
        },

        async fetchDungeonItems({commit, getters}, limit = 10, offset = 0,) {
            const url = process.env.VUE_APP_BACKEND_URL + "/api/dungeon/items?"
                + new URLSearchParams(Object.entries({
                    limit: limit,
                    offset: offset,
                })).toString()

            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({filters: getters.getApiFilters}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const items = await res.json()
            commit('updateDungeonItems', items['data'])
            commit('updateDungeonItemsCount', items['count'])
        }

    },
    mutations: {
        addItemToWishList(state, item) {
            state.wishList.push(item)
        },
        updateDungeonItems(state, items) {
            state.dungeonItems = items
        },
        updateDungeonItemsCount(state, count) {
            state.count = count
        },
        updateFilteredClasses(state, filteredClasses) {
            state.filteredClasses = filteredClasses
        },
        updateInventoryType(state, inventoryType) {
            state.inventoryType = inventoryType
        },
        updateFilters(state, newFilters) {
            state.itemFilters = newFilters
        },
        updateSelectedClasses(state, classes) {
            state.filteredClasses.forEach(p => p.checked = classes.indexOf(p.name) !== -1)
        },
        updateSelectedInventoryType(state, inventoryType) {
            state.inventoryType.forEach(p => p.checked = inventoryType.indexOf(p.name) !== -1)
        }

    },
    state: {
        dungeonItems: [],
        filteredClasses: [
            {name: "Warrior", image: require('@/assets/wow_classes/warrior.png'), checked: false},
            {name: "Paladin", image: require('@/assets/wow_classes/pala.png'), checked: false},
            {name: "Hunter", image: require('@/assets/wow_classes/hunt.png'), checked: false},
            {name: "Rogue", image: require('@/assets/wow_classes/rogue.png'), checked: false},
            {name: "Priest", image: require('@/assets/wow_classes/priest.png'), checked: false},
            {name: "Death Knight", image: require('@/assets/wow_classes/dk.png'), checked: false},
            {name: "Shaman", image: require('@/assets/wow_classes/shaman.png'), checked: false},
            {name: "Mage", image: require('@/assets/wow_classes/mage.png'), checked: false},
            {name: "Warlock", image: require('@/assets/wow_classes/warlock.png'), checked: false},
            {name: "Monk", image: require('@/assets/wow_classes/monk.png'), checked: false},
            {name: "Druid", image: require('@/assets/wow_classes/druid.png'), checked: false},
            {name: "Demon Hunter", image: require('@/assets/wow_classes/dh.png'), checked: false}
        ],
        inventoryType: [
            {name: "Ranged", image: require('@/assets/inventory_types/Inv_bow.png'), checked: false},
            {name: "Two-Hand", image: require('@/assets/inventory_types/Inv_two_hand.png'), checked: false},
            {name: "One-Hand", image: require('@/assets/inventory_types/Inv_one_hand.png'), checked: false},
            {
                name: "Held In Off-hand",
                image: require('@/assets/inventory_types/Inv_held_in_offhand.png'),
                checked: false
            },
            {name: "Off Hand", image: require('@/assets/inventory_types/Inv_shield_04.png'), checked: false},
            {name: "Wrist", image: require('@/assets/inventory_types/Inv_wrist.png'), checked: false},
            {name: "Hands", image: require('@/assets/inventory_types/Inv_hands.png'), checked: false},
            {name: "Waist", image: require('@/assets/inventory_types/Inv_waist.png'), checked: false},
            {name: "Legs", image: require('@/assets/inventory_types/Inv_pants.png'), checked: false},
            {name: "Feet", image: require('@/assets/inventory_types/Inv_feet.png'), checked: false},
            // {name: "Back", image: require('@/assets/inventory_types/warrior.png'), checked: false},
            {name: "Finger", image: require('@/assets/inventory_types/Inv_finger.png'), checked: false},
            {name: "Trinket", image: require('@/assets/inventory_types/Inv_trinket.png'), checked: false},
        ],
        itemFilters: [],
        wishList: [],
    },
    getters: {
        getApiEntities(state) {
            return state.dungeonItems
        },
        getFilteredClasses(state) {
            return state.filteredClasses
        },
        getInventoryType(state) {
            return state.inventoryType
        },
        getItemFilters(state) {
            return state.itemFilters
        },
        getWishList(state) {
            return state.wishList
        },
        getSelectedClasses(state) {
            return state.filteredClasses.filter(p => p.checked).map(p => p.name)
        },
        getSelectedInventoryType(state) {
            return state.inventoryType.filter(p => p.checked).map(p => p.name)
        },
        getApiFilters(state, getters) {
            let apiFilters = []
            if (state.itemFilters.length) {
                apiFilters = apiFilters.concat(state.itemFilters)
            }
            if (getters.getSelectedClasses.length) {
                apiFilters = apiFilters.concat([{
                    'field': 'wow_player_class.name',
                    'operator': 'in',
                    'value': getters.getSelectedClasses
                }])
            }
            if (getters.getSelectedInventoryType.length) {
                apiFilters = apiFilters.concat([{
                    'field': 'inventory_type',
                    'operator': 'in',
                    'value': getters.getSelectedInventoryType
                }])
            }
            return apiFilters
        }
    },

}