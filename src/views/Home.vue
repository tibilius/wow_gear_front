<template>
    <DungItemList
            v-bind:g_items="g_items"
            v-bind:item_filters="item_filters"
            v-bind:filteredClasses="filteredClasses"
            @search-submit="doSearch"
            @change-filtered-classes="onChangeFilteredClasses"
    />
</template>

<script>
    import DungItemList from "../components/DungItemList";
    import router from "../router";

    export default {
        name: "Home",
        components: {
            DungItemList
        },
        data() {
            return {
                g_items: [],
                item_filters: [],
                filteredClasses: [],
                limit: 100,
                offset: 0,

            }
        },
        computed: {
            apiFilters: {
                get: function () {
                    let result = []
                    if (this.item_filters.length) {
                        result = result.concat(this.item_filters)
                    }
                    if (this.filteredClasses.length) {
                        result = result.concat([{
                            'field': 'wow_player_class.name',
                            'operator': 'in',
                            'value': this.filteredClasses
                        }])
                    }
                    return JSON.stringify(result)
                },
                set: function (newValue) { //$route.query
                    if (newValue.filters) {
                        this.item_filters = JSON.parse(newValue.filters)
                    }
                    if (newValue.class) {
                        this.filteredClasses = JSON.parse(newValue.class)
                    }
                }
            }
        },
        methods: {
            onChangeFilteredClasses: function(value){
                this.filteredClasses = value
                this.doSearch()

            },
            doSearch: function () {
                const url = "http://tibilius.me/api/dungeon/items?" + new URLSearchParams(Object.entries({
                    limit: this.limit,
                    offset: this.offset,
                    filters: this.apiFilters,
                })).toString()

                try {
                    fetch(url)
                        .then(response => response.json())
                        .then(json => {
                            this.g_items = json.data

                            let query = Object.assign({}, this.$route.query);
                            query.filters = JSON.stringify(this.item_filters);
                            query.class = JSON.stringify(this.filteredClasses);

                            router.push({path: this.$route.path, query: query})
                        })
                } catch (e) {
                    router.push({path: '/'})
                }
            }
        },
        watch: {
            '$route' (to) {
                this.apiFilters = to.query
                this.doSearch()
            }
        },
        mounted() {
            this.apiFilters = this.$route.query
            const url = "http://tibilius.me/api/dungeon/items?" + new URLSearchParams(Object.entries({
                    limit: this.limit,
                    offset: this.offset,
                    filters: this.apiFilters,
                }
            )).toString()
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    this.g_items = json.data
                })
        }
    }
</script>

<style scoped>

</style>