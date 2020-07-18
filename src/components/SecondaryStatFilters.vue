<template>
    <div :class="hidden?'containerLine':'containerExpanded'" style="cursor: pointer">
        <p v-show="hidden" @click="hidden=false" title="Click to expand" :class="hidden?'hidden':'expanded'">
            Advanced Secondary Stats Filters <span class="selected">{{ itemFilters | concat }}</span>
        </p>
        <p v-show="!hidden" @click="hidden=true" title="Click to toggle" :class="hidden?'hidden':'expanded'">
            Advanced Secondary Stats Filters
        </p>
        <transition name="fade" v-show="!hidden">
            <div v-show="!hidden">
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
            </div>
        </transition>
    </div>
</template>

<script>
    import FieldOperatorValueSearchItem from "@/components/FieldOperatorValueSearchItem";

    export default {
        name: "SecondaryStatFilters",
        props: ['itemFilters'],
        components: {FieldOperatorValueSearchItem},
        data() {
            return {
                hidden: true,
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
        filters: {
            concat: function (e) {
                if (!e.length){
                    return 'None'
                }
                return e.filter(p => p['field'] !== null).map(p => {
                    return p['field'] + ' ' + p['operator'] + ' ' + p['value']
                }).join(' and ')

            },
        },
        methods: {
            onSubmit: function () {
                let query = Object.assign({}, this.$route.query);
                query.filters = JSON.stringify(this.$store.getters.getItemFilters);
                this.$router.push({path: this.$route.path, query: query}).catch(() => {
                })
            },
            addFilter: function () {
                this.itemFilters.push({field: null, operator: null, value: null})
            },
            removeFilter: function (index) {
                this.itemFilters.splice(index, 1)
                this.onSubmit()
            },
        },
    }
</script>

<style scoped>
    span.selected{
        color: #a048af;
    }
    div.containerExpanded {
        display: block;
        border: solid 1px #ccc;
    }

    div.containerLine {
        margin-right: 10px;
        display: inline-block;
    }

    .add-filter {
        border-radius: 1rem;
    }

</style>