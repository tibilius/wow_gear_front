<template>
    <form @submit.prevent="onSubmit">
        <div class="wow_class_select">
            <WowPLayerClassSelect v-bind:filteredClasses="filteredClasses"/>
        </div>
        <div class="inventory_type_select">
            <InventoryTypeSelect v-bind:inventoryType="inventoryType"/>
        </div>
        <span>Secondary Stats Filters</span>&nbsp;
        <button class="add-filter" type="button" @click.prevent="addFilter()">&#43;</button>
        <FieldOperatorValueSearchItem
                v-for="(filter, index) in itemFilters"
                :key="index"
                v-bind:item_filter="filter"
                v-bind:filter_operators="filter_operators"
                v-bind:filter_fields="filter_fields"
                v-bind:index="index"
                @remove-filter="removeFilter"
                @submit-filter="onSubmit"
        />
        <button v-if="itemFilters.length" type="submit" @click.prevent="onSubmit">Search</button>
    </form>
</template>

<script>
    import FieldOperatorValueSearchItem from "@/components/FieldOperatorValueSearchItem";
    import WowPLayerClassSelect from "@/components/WowPLayerClassSelect";
    import InventoryTypeSelect from "@/components/InventoryTypeSelect";

    export default {
        name: "SearchItemsForm",
        data() {
            return {
                // @todo grab from api desc
                filter_fields: [
                    {value: "crit", text: "Crit Chance"},
                    {value: "haste", text: "Haste"},
                    {value: "versatility", text: "Versatility"},
                    {value: "mastery", text: "Mastery"},
                ],
                filter_operators: [
                    {value: "gte", text: "&gt;="},
                    {value: "lte", text: "&lt;="},
                    {value: "gt", text: "&gt;"},
                    {value: "lt", text: "&lt;"},
                    {value: "eq", text: "="},
                    {value: "neq", text: "≠"},
                ],
            }
        },
        props: {
            itemFilters: Array,
            inventoryType: Array,
            filteredClasses: Array,
        },
        methods: {
            onSubmit: function () {
                let query = Object.assign({}, this.$route.query);
                query.filters = JSON.stringify(this.$store.getters.getItemFilters);
                this.$router.push({path: this.$route.path, query: query}).catch(() => {})
            },
            addFilter: function () {
                this.itemFilters.push({field: null, operator: null, value: null})
            },
            removeFilter: function (index) {
                this.itemFilters.splice(index, 1)
                this.$emit('search-submit')
            },
        },
        components: {FieldOperatorValueSearchItem, WowPLayerClassSelect, InventoryTypeSelect}

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wow_class_select, .inventory_type_select {
        margin: 20px auto;
    }


    .add-filter {
        border-radius: 1rem;
    }

</style>
