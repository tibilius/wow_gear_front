<template>
    <DungItemList
            v-bind:g_items="g_items"
            v-bind:item_filters="item_filters"
            v-bind:filteredClasses="filteredClasses"
            @search-submit="doSearch"
            @change-filtered-classes="onChangeFilteredClasses"
            @change-inventory-type="onChangeinventoryType"
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
                inventory_type: [],
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
                    if (this.inventory_type.length) {
                        result = result.concat([{
                            'field': 'inventory_type',
                            'operator': 'in',
                            'value': this.inventory_type
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
                    if (newValue.inventory_type) {
                        this.inventory_type = JSON.parse(newValue.inventory_type)
                    }
                }
            }
        },
        methods: {
            onChangeFilteredClasses: function (value) {
                this.filteredClasses = value
                this.doSearch()
            },
            onChangeinventoryType: function (value) {
                this.inventory_type = value
                this.doSearch()
            },
            doSearch: function () {
                let query = Object.assign({}, this.$route.query);
                query.filters = JSON.stringify(this.item_filters);
                query.class = JSON.stringify(this.filteredClasses);
                query.inventory_type = JSON.stringify(this.inventory_type);
                router.push({path: this.$route.path, query: query}).catch(() => {
                })
            },
            getApiEnities: function () {
                const url = "http://tibilius.me/api/dungeon/items?" + new URLSearchParams(Object.entries({
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
                })
            }
        },
        watch: {
            '$route'(to) {
                this.apiFilters = to.query
                this.getApiEnities()
            }
        },
        mounted() {
            this.apiFilters = this.$route.query
            this.getApiEnities()
        }
    }
</script>

<style scoped>

</style>