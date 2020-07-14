<template>
    <div>
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
        computed:{
            wishList() {
                return this.$store.getters.getWishList;
            },
            filteredClasses() {
                return this.$store.getters.getFilteredClasses;
            },
        }
    }
</script>

<style scoped>

</style>