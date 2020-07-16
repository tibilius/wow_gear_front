export default {
    actions: {
        async queryWishListUpdate(ctx, routeQuery) {
            if (!routeQuery.items || JSON.stringify(ctx.getters.getWishListItemsIds) === routeQuery.items) {
                return
            }
            ctx.commit('loading')
            const url = process.env.VUE_APP_BACKEND_URL + "/api/dungeon/items?"
                + new URLSearchParams(Object.entries({
                    limit: 100
                })).toString()

            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    filters: [{
                        "field": "id",
                        "operator": "in",
                        "value": JSON.parse(routeQuery.items)
                    }]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let items = {'data': [], 'count': 0}
            try {
                items = await res.json()

            } catch (e) {
                console.log(e)
            }
            ctx.commit('updateWishList', items['data'])
            ctx.commit('loaded')
        },
    },
    state: {
        wishList: []
    },
    mutations: {
        addItemToWishList(state, item) {
            state.wishList.push(item)
        },
        updateWishList(state, items) {
            state.wishList = items
        },
        removeFromWishList(state, item) {
            state.wishList.splice(state.wishList.findIndex(p => p.id === item.id), 1)
        },

    },
    getters: {
        getWishList(state) {
            return state.wishList
        },
        getWishListCount(state) {
            return state.wishList.length
        },
        getWishListDownload(state) {
            let b = state.wishList.map(p => [
                p.dungeon.shortcut, p.inventory_type, p.item_subclass, p.name, p.haste, p.mastery, p.crit, p.versatility, p.id
            ])
            b.unshift(['dungeon', 'type', 'subclass', 'name', 'haste', 'mastery', 'crit.chance', 'versatility', 'id',])
            return b.map(e => e.join(",")).join("\n")
        },
        getWishListItemsIds(state) {
            return state.wishList.map(p => p.id)
        },

    }


}