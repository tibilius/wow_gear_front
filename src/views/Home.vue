<template>
    <div>
        <SearchItemsForm
                v-bind:itemFilters="itemFilters"
                v-bind:filteredClasses="filteredClasses"
                v-bind:inventoryType="inventoryType"
                v-bind:dungeons="dungeons"
                v-bind:secondaryMainStat="secondaryMainStat"
                v-bind:secondaryStats="secondaryStats"
        />
        <DungItemList
                v-bind:gItems="gItems"
                v-bind:filteredClasses="filteredClasses"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="isBusy"
                infinite-scroll-distance="0"
        />
    </div>
</template>

<script>
    import DungItemList from "../components/DungItemList";
    import SearchItemsForm from "@/components/SearchItemsForm";
    // import {MapGetters, MapActions} from 'vuex'
    export default {
        name: "Home",
        components: {
            DungItemList, SearchItemsForm
        },
        computed: {
            isBusy(){
              return this.$store.getters.isLoading
            },
            gItems() {
                return this.$store.getters.getApiEntities;
            },
            dungeons(){
                return this.$store.getters.getDungeon
            },
            inventoryType() {
                return this.$store.getters.getInventoryType;
            },
            itemFilters() {
                return this.$store.getters.getItemFilters;
            },
            filteredClasses() {
                return this.$store.getters.getFilteredClasses;
            },
            secondaryMainStat() {
                return this.$store.getters.getSecondaryMainStat
            },
            secondaryStats() {
                return this.$store.getters.getSecondaryStats
            },
        },
        methods:{
            loadMore: function() {
                this.$store.dispatch('loadMoreEntities', 10)
            }
        },
        watch: {
            '$route'(to) {
                this.$store.dispatch('queryExternalUpdate', to.query)
            }
        },
        mounted() {
            this.$store.dispatch('queryExternalUpdate', this.$route.query)
        }
    }
</script>

<style scoped>

</style>