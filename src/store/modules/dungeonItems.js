export default {
    actions: {
        /**
         * @todo encapsulate it!
         */
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
            if (routeQuery.dungeon && (parsed = JSON.parse(routeQuery.dungeon)).length) {
                ctx.commit('updateSelectedDungeon', parsed)
            }
            if (routeQuery.secondary_main_stat && (parsed = JSON.parse(routeQuery.secondary_main_stat)).length) {
                ctx.commit('updateSelectedSecondaryMainStat', parsed)
            }
            if (routeQuery.secondary_stats && (parsed = JSON.parse(routeQuery.secondary_stats)).length) {
                ctx.commit('updateSelectedSecondaryStats', parsed)
            }
            ctx.dispatch('fetchDungeonItems')
            ctx.commit('init')
        },
        loadMoreEntities(ctx, limit) {
            ctx.commit('loading')
            const url = process.env.VUE_APP_BACKEND_URL + "/api/dungeon/items?"
                + new URLSearchParams(Object.entries({
                    limit: limit,
                    offset: ctx.getters.getCurrentOffset,
                })).toString()
            let items = {'data': [], 'count': 0}
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({filters: ctx.getters.getApiFilters}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(json => {
                items = json
                ctx.commit('addDungeonItems', items['data'])
                ctx.commit('incrementOffset', limit)
                ctx.commit('loaded')

            }).catch(() => {
                ctx.commit('addDungeonItems', items['data'])
                ctx.commit('loaded')
            })
        },
        async fetchDungeonItems({commit, getters}, limit = 20, offset = 0,) {
            commit('loading')
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
            let items = {'data': [], 'count': 0}
            try {
                items = await res.json()
                commit('updateOffset', limit)
            } catch (e) {
                console.error(e)
                commit('loaded')
            }
            commit('updateDungeonItems', items['data'])
            commit('updateDungeonItemsCount', items['count'])
            commit('loaded')
        }

    },
    mutations: {
        addDungeonItems(state, items) {
            state.dungeonItems = state.dungeonItems.concat(items)
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
        },
        updateSelectedSecondaryMainStat(state, stats) {
            state.secondaryMainStat.forEach(p => p.checked = stats.indexOf(p.name) !== -1)
        },
        updateSelectedSecondaryStats(state, stats) {
            state.secondaryStats.forEach(p => p.checked = stats.indexOf(p.name) !== -1)
        },
        incrementOffset(state, offset) {
            state.offset = state.offset + offset
        },
        updateOffset(state, offset) {
            state.offset = offset
        },

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
        secondaryMainStat: [
            {name: "versatility", checked: false},
            {name: "haste", checked: false},
            {name: "crit", checked: false},
            {name: "mastery", checked: false},
        ],
        secondaryStats: [
            {name: "versatility", checked: false},
            {name: "haste", checked: false},
            {name: "crit", checked: false},
            {name: "mastery", checked: false},
        ],
        itemFilters: [],
        count: 0,
        offset: 0,
    },
    getters: {
        getCurrentOffset(state) {
            return state.offset
        },
        getApiEntities(state) {
            return state.dungeonItems
        },
        getApiEntitiesCount(state) {
            return state.count
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
        getSelectedClasses(state) {
            return state.filteredClasses.filter(p => p.checked).map(p => p.name)
        },
        getSelectedInventoryType(state) {
            return state.inventoryType.filter(p => p.checked).map(p => p.name)
        },
        getSecondaryMainStat(state) {
            return state.secondaryMainStat
        },
        getSelectedSecondaryMainStat(state) {
            return state.secondaryMainStat.filter(p => p.checked).map(p => p.name)
        },
        getSecondaryStats(state) {
            return state.secondaryStats
        },
        getSelectedSecondaryStats(state) {
            return state.secondaryStats.filter(p => p.checked).map(p => p.name)
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
            if (getters.getSelectedDungeon.length) {
                apiFilters = apiFilters.concat([{
                    'field': 'dungeon.shortcut',
                    'operator': 'notIn',
                    'value': getters.getSelectedDungeon
                }])
            }
            if (getters.getSelectedSecondaryMainStat.length) {
                apiFilters = apiFilters.concat([{
                    'field': 'main_secondary_stat',
                    'operator': 'in',
                    'value': getters.getSelectedSecondaryMainStat
                }])
            }
            if (getters.getSelectedSecondaryStats.length) {
                apiFilters = apiFilters.concat(getters.getSelectedSecondaryStats.map(p => {
                    return {"field": p, "operator": "gt", "value": 0}
                }))
            }
            return apiFilters
        }
    },

}