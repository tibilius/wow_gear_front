<template>
    <div>

        <a v-if="wishList.length"
           :href="'data:application/csv;charset=utf-8,' + encodeURI($store.getters.getWishListDownload)"
           download="wishlist.csv">
            Export to csv
        </a>
        <DungItemList
                v-bind:gItems="wishList"
                v-bind:filteredClasses="filteredClasses"

        />
    </div>

</template>

<script>
    import DungItemList from "../components/DungItemList";

    export default {
        name: "WishList",
        components: {
            DungItemList
        },
        computed: {
            wishList() {
                return this.$store.getters.getWishList;
            },
            filteredClasses() {
                return this.$store.getters.getFilteredClasses;
            },
        },
        watch: {
            '$route'(to) {
                this.$store.dispatch('queryWishListUpdate', to.query)
            },
            wishList: function () {
                this.syncQueryParams(this.$route.query)
            }
        },
        methods: {
            syncQueryParams(toQuery) {
                let query = Object.assign({}, toQuery)
                const wishListItems = JSON.stringify(this.$store.getters.getWishListItemsIds)
                if (query.items !== wishListItems) {
                    this.wishList.length
                        ? query.items = wishListItems
                        : delete query.items
                    this.$router.push({path: this.$route.path, query: query}).catch(() => {
                    })
                }
            }
        },
        mounted() {
            this.$store.dispatch('queryWishListUpdate', this.$route.query)
            this.syncQueryParams(this.$route.query)
        }
    }
</script>

<style scoped>

</style>