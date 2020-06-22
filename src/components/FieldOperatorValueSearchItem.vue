<template>
    <div class="search-item">
        <select :name="'filters['+index+'][field]'" v-model="item_filter.field">
            <option v-for="(option, index) in filter_fields" :key="index" v-bind:value="option.value">{{option.text}}
            </option>
        </select>
        <select :name="'filters['+index+'][operator]'" v-model="item_filter.operator">
            <option v-for="(option, index) in filter_operators" :key="index" v-bind:value="option.value"
                    v-html="option.text"/>
        </select>
        <input :name="'filters['+index+'][value]'" type="text" required="required" v-model="item_filter.value">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // @todo grab from api desc
                filter_fields: [
                    {value: "crit", text: "Crit Chance"},
                    {value: "haste", text: "Haste"},
                    {value: "versatility", text: "Versatility"},
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
            item_filter: {
                type: Object
            },
            index:Number
        }
    }
</script>

<style scoped>
</style>
