<template>
    <form @submit.prevent="onSubmit">
        <div class="wow_class_select">
            <WowPLayerClassSelect v-bind:filteredClasses="filteredClasses"/>
        </div>
        <div class="inventory_type_select">
            <InventoryTypeSelect v-bind:inventoryType="inventoryType"/>
        </div>
        <div class="filters">
            <DungeonExcludeSelect v-bind:dungeons="dungeons"/>
            <SecondaryMainStatFilter v-bind:secondaryMainStat="secondaryMainStat"/>
            <SecondaryStatFilters v-bind:itemFilters="itemFilters"/>
        </div>
    </form>
</template>

<script>
    import WowPLayerClassSelect from "@/components/WowPLayerClassSelect";
    import InventoryTypeSelect from "@/components/InventoryTypeSelect";
    import DungeonExcludeSelect from "@/components/DungeonExcludeSelect";
    import SecondaryMainStatFilter from "@/components/SecondaryMainStatFilter";
    import SecondaryStatFilters from "@/components/SecondaryStatFilters";

    export default {
        name: "SearchItemsForm",
        props: {
            itemFilters: Array,
            inventoryType: Array,
            filteredClasses: Array,
            dungeons: Array,
            secondaryMainStat: Array,
        },
        components: {
            SecondaryStatFilters,
            SecondaryMainStatFilter,
            DungeonExcludeSelect,
            WowPLayerClassSelect,
            InventoryTypeSelect
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wow_class_select, .inventory_type_select {
        margin: 5px auto;
    }
</style>
