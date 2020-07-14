<template>
    <DungItemList
            v-bind:gItems="wishList"
    />
</template>

<script>
    import DungItemList from "../components/DungItemList";

    export default {
        name: "WishList",
        components: {
            DungItemList
        },
        data() {
            return {
                wishList:[],
            }
        },
        methods: {
            addItem: function(item) {
              this.wishList.push(item)
            },
            getApiEnities: function () {
                const url = process.env.VUE_APP_BACKEND_URL + "/api/dungeon/items?"
                    + new URLSearchParams(Object.entries({
                        limit: this.limit,
                        offset: this.offset,
                    })).toString()
                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({filters: this.apiFilters}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(json => {
                        this.g_items = json.data
                    }).catch(() => {
                    this.g_items = []
                })
            }
        },
        watch: {

        },
        mounted() {
            this.wishList = localStorage.wishList;
            this.getApiEnities()
        }
    }
</script>

<style scoped>

</style>