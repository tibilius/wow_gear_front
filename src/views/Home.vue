<template>
    <div>
        <SearchItemsForm
                v-bind:itemFilters="itemFilters"
                v-bind:filteredClasses="filteredClasses"
                v-bind:inventoryType="inventoryType"
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
        data() {
            return {
                busy:false
            }
        },

        computed: {
            isBusy(){
              return this.$store.getters.isLoading
            },
            gItems() {
                return this.$store.getters.getApiEntities;
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
        },
        methods:{
            loadMore: function() {
                this.busy = true
                this.$store.dispatch('loadMoreEntities', 10)
                this.busy=false
            }
        },
        watch: {
            '$route'(to) {
                this.$store.dispatch('queryExternalUpdate', to.query)
            }
        },
        mounted() {
            console.log('mounted')
            this.$store.dispatch('queryExternalUpdate', this.$route.query)
        }
    }
</script>

<style scoped>

</style>