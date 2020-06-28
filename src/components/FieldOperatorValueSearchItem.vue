<template>
    <div class="search-item">
        <select :name="'filters['+index+'][field]'" v-model="item_filter.field">
            <option v-for="(option, index) in filter_fields" :key="index" v-bind:value="option.value">
                {{option.text}}
            </option>
        </select>
        <select :name="'filters['+index+'][operator]'" v-model="item_filter.operator">
            <option v-for="(option, index) in filter_operators" :key="index" v-bind:value="option.value"
                    v-html="option.text"/>
        </select>
        <input :name="'filters['+index+'][value]'"
               type="text" required="required"
               v-model="item_filter.value"
               @submit.prevent="enterFilter"
        >
        <button type="button" @click.prevent="removeFilter">&#10060;</button>
    </div>
</template>

<script>
    export default {
        props: {
            filter_fields: Array,
            filter_operators: Array,
            item_filter: Object,
            index:Number
        },
        methods: {
            removeFilter:function () {
                this.$emit('remove-filter', this.index)
            },
            enterFilter:function () {
                this.$emit('submit-filter')
            }
        }
    }
</script>

<style scoped>
    .search-item button{
        border-radius: 1rem;
        margin-right: 10px;
    }
    select, input{
        margin-right:  5px;
        background-color: #7e8690;
        border: 1px solid #2a3340;
    }
</style>
