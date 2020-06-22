<template>
    <form @submit.prevent="onSubmit">
        <span>Filters</span>&nbsp;<button type="button" @click.prevent="addFilter()">&#43;</button>

        <FieldOperatorValueSearchItem
                v-for="(filter, index) in item_filters"
                :key="index"
                v-bind:item_filter="filter"
                v-bind:index="index"
        />
        <button v-if="item_filters.length" type="submit" @click.prevent="onSubmit">Search</button>
    </form>
</template>

<script>
    import FieldOperatorValueSearchItem from "@/components/FieldOperatorValueSearchItem";

    export default {
        props: {
            item_filters: {
                type: Array
            },
        },
        methods: {
            onSubmit: function () {
                this.$emit('search-submit')
            },
            addFilter: function () {
                this.item_filters.push({field: null, operator: null, value: null})
            },
        },
        components: {FieldOperatorValueSearchItem}

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
