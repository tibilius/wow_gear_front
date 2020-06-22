<template>
    <div id="app">
        <DungItemList
                v-bind:g_items="g_items"
                v-bind:item_filters="item_filters"
                @search-submit="doSearch"
        />
    </div>
</template>

<script>
    import DungItemList from "./components/DungItemList";
    export default {
        name: 'App',
        components: {
            DungItemList
        },
        data() {
            return {
                g_items: [],
                // item_filters:[],
                limit:10,
                offset:0,
                item_filters: [
                    {field: "haste", operator: "gte", value: 10}
                ]
            }
        },
        methods:{
            doSearch: function() {
                const urlParams = new URLSearchParams(Object.entries({
                    limit:this.limit,
                    offset:this.offset,
                    filters:JSON.stringify(this.item_filters),
                }));
                const url = "http://tibilius.me/api/dungeon/items?"+urlParams.toString()
                    // +'&filters='+JSON.stringify(this.item_filters)

                fetch(url)
                    .then(response => response.json())
                    .then(json => {
                        this.g_items = json.data
                    })
            }
        },
        mounted() {
            fetch("http://tibilius.me/api/dungeon/items?limit=10&offset=0")
                .then(response => response.json())
                .then(json => {
                    this.g_items = json.data
                })
        }

    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
