<template>
    <form @submit.prevent="onSubmit">
        <div class="wow_class_select">
            <WowPLayerClassSelect
                    v-for="(w_class, index) in wow_classes" :key="index"
                    v-bind:index="index"
                    v-bind:w_class="w_class"
                    @change-class="changeClasses"
            />
        </div>
        <span>Filters</span>&nbsp;<button class="add-filter" type="button" @click.prevent="addFilter()">&#43;</button>
        <FieldOperatorValueSearchItem
                v-for="(filter, index) in item_filters"
                :key="index"
                v-bind:item_filter="filter"
                v-bind:filter_operators="filter_operators"
                v-bind:filter_fields="filter_fields"
                v-bind:index="index"
                @remove-filter="removeFilter"
                @submit-filter="onSubmit"
        />
        <button v-if="item_filters.length" type="submit" @click.prevent="onSubmit">Search</button>
    </form>
</template>

<script>
    import FieldOperatorValueSearchItem from "@/components/FieldOperatorValueSearchItem";
    import WowPLayerClassSelect from "@/components/WowPLayerClassSelect";

    export default {
        name: "SearchItemsForm",
        data() {
            return {
                // @todo grab from api desc
                wow_classes: [
                    {name: "Warrior", image: require('@/assets/wow_classes/warrior.jpg'), checked: false},
                    {name: "Paladin", image: require('@/assets/wow_classes/pala.jpg'), checked: false},
                    {name: "Hunter", image: require('@/assets/wow_classes/hunt.jpg'), checked: false},
                    {name: "Rouge", image: require('@/assets/wow_classes/rouge.jpg'), checked: false},
                    {name: "Priest", image: require('@/assets/wow_classes/priest.jpg'), checked: false},
                    {name: "Death Knight", image: require('@/assets/wow_classes/dk.jpg'), checked: false},
                    {name: "Shaman", image: require('@/assets/wow_classes/shaman.jpg'), checked: false},
                    {name: "Mage", image: require('@/assets/wow_classes/mage.jpg'), checked: false},
                    {name: "Warlock", image: require('@/assets/wow_classes/warlock.jpg'), checked: false},
                    {name: "Monk", image: require('@/assets/wow_classes/monk.jpg'), checked: false},
                    {name: "Druid", image: require('@/assets/wow_classes/druid.jpg'), checked: false},
                    {name: "Demon Hunter", image: require('@/assets/wow_classes/dh.jpg'), checked: false}

                ],
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
            item_filters: Array,
            filteredClasses: Array,
        },
        watch: {
            filteredClasses: function () {
                this.wow_classes.forEach(element => {
                    if (this.filteredClasses.indexOf(element.name) !== -1) {
                        element.checked = true;
                    }
                    else {
                        element.checked = false;
                    }
                })
            }
        },

        computed: {
            compfilteredClasses: {
                get: function () {
                    return this.wow_classes.filter(p => p.checked).map(function (item) {
                        return item.name;
                    })

                }
            }
        },
        methods: {
            onSubmit: function () {
                this.$emit('search-submit')
            },
            addFilter: function () {
                this.item_filters.push({field: null, operator: null, value: null})
            },
            removeFilter: function (index) {
                this.item_filters.splice(index)
                this.$emit('search-submit')
            },
            changeClasses: function () {
                this.$emit('change-filtered-classes', this.compfilteredClasses)
            },
        },
        components: {FieldOperatorValueSearchItem, WowPLayerClassSelect}

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .wow_class_select {
        margin: 20px auto;
    }

    .wow_class_select > div {
        display: inline-block;
    }

    .add-filter {
        border-radius: 1rem;
    }
</style>
