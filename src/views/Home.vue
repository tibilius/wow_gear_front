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
                limit: 100,
                offset: 0,
            }
        },

        computed: {
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
        watch: {
            '$route'(to) {
                this.$store.dispatch('queryExternalUpdate', to.query)
            }
        },
        mounted() {
            this.$store.dispatch('queryExternalUpdate',this.$route.query)
        }
    }
</script>

<style scoped>

</style>