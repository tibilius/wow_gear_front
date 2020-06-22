<template>
    <div>
        <SearchItemsForm v-bind:item_filters="item_filters" @search-submit="onSubmit"/>
        <ul class="items tilesWrap">
            <DungItem
                    v-for="g_item in g_items"
                    :key="g_item.id"
                    v-bind:g_item="g_item"
            />
        </ul>
    </div>
</template>

<script>
    import DungItem from "@/components/DungItem";
    import SearchItemsForm from "@/components/SearchItemsForm";

    export default {
        props: {
            g_items: {
                type: Array
            },
            item_filters: {
                type: Array
            }
        },
        methods: {
            onSubmit: function () {
                console.log(this.item_filters)
                this.$emit('search-submit')
            },
        },
        components: {SearchItemsForm, DungItem}

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
        background: #262a2b;
    }

    .tilesWrap {
        padding: 0;
        margin: 50px auto;
        list-style: none;
        text-align: center;
    }
</style>
