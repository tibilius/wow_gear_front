<template>
    <div>
        <ul class="items tilesWrap">
            <DungItem
                    v-for="gItem in gItems"
                    :key="gItem.id"
                    v-bind:gItem="gItem"
                    v-bind:filteredClasses="filteredClasses"
            />
        </ul>
    </div>
</template>

<script>
    import DungItem from "@/components/DungItem"

    export default {
        props: {
            gItems: Array,
            filteredClasses: Array,
        },
        components: {DungItem}
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
