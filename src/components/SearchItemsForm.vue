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
        <div class="inventory_type_select">
            <InventoryTypeSelect
                    v-for="(inventory_type, index) in inventory_types" :key="index"
                    v-bind:index="index"
                    v-bind:inventory_type="inventory_type"
                    @change-inventory="changeInventoryType"
            />
        </div>
        <span>Secondary Stats Filters</span>&nbsp;
        <button class="add-filter" type="button" @click.prevent="addFilter()">&#43;</button>
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
    import InventoryTypeSelect from "@/components/InventoryTypeSelect";

    export default {
        name: "SearchItemsForm",
        data() {
            return {
                // @todo grab from api desc
                wow_classes: [
                    {name: "Warrior", image: require('@/assets/wow_classes/warrior.png'), checked: false},
                    {name: "Paladin", image: require('@/assets/wow_classes/pala.png'), checked: false},
                    {name: "Hunter", image: require('@/assets/wow_classes/hunt.png'), checked: false},
                    {name: "Rouge", image: require('@/assets/wow_classes/rogue.png'), checked: false},
                    {name: "Priest", image: require('@/assets/wow_classes/priest.png'), checked: false},
                    {name: "Death Knight", image: require('@/assets/wow_classes/dk.png'), checked: false},
                    {name: "Shaman", image: require('@/assets/wow_classes/shaman.png'), checked: false},
                    {name: "Mage", image: require('@/assets/wow_classes/mage.png'), checked: false},
                    {name: "Warlock", image: require('@/assets/wow_classes/warlock.png'), checked: false},
                    {name: "Monk", image: require('@/assets/wow_classes/monk.png'), checked: false},
                    {name: "Druid", image: require('@/assets/wow_classes/druid.png'), checked: false},
                    {name: "Demon Hunter", image: require('@/assets/wow_classes/dh.png'), checked: false}
                ],
                inventory_types: [
                    {name: "Ranged", image: require('@/assets/inventory_types/Inv_bow.png'), checked: false},
                    {name: "Two-Hand", image: require('@/assets/inventory_types/Inv_two_hand.png'), checked: false},
                    {name: "One-Hand", image: require('@/assets/inventory_types/Inv_one_hand.png'), checked: false},
                    {name: "Held In Off-hand", image: require('@/assets/inventory_types/Inv_held_in_offhand.png'), checked: false},
                    {name: "Off Hand", image: require('@/assets/inventory_types/Inv_shield_04.png'), checked: false},
                    {name: "Wrist", image: require('@/assets/inventory_types/Inv_wrist.png'), checked: false},
                    {name: "Hands", image: require('@/assets/inventory_types/Inv_hands.png'), checked: false},
                    {name: "Waist", image: require('@/assets/inventory_types/Inv_waist.png'), checked: false},
                    {name: "Legs", image: require('@/assets/inventory_types/Inv_pants.png'), checked: false},
                    {name: "Feet", image: require('@/assets/inventory_types/Inv_feet.png'), checked: false},
                    // {name: "Back", image: require('@/assets/inventory_types/warrior.png'), checked: false},
                    {name: "Finger", image: require('@/assets/inventory_types/Inv_finger.png'), checked: false},
                    {name: "Trinket", image: require('@/assets/inventory_types/Inv_trinket.png'), checked: false},
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
            inventoryType: Array,
        },
        watch: {
            filteredClasses: function () {
                this.wow_classes.forEach(element => {
                    if (this.filteredClasses.indexOf(element.name) !== -1) {
                        element.checked = true;
                    } else {
                        element.checked = false;
                    }
                })
            },
            inventoryType: function () {
                this.inventory_types.forEach(element => {
                    if (this.inventoryType.indexOf(element.name) !== -1) {
                        element.checked = true;
                    } else {
                        element.checked = false;
                    }
                })
            },
        },

        computed: {
            c_filteredClasses: {
                get: function () {
                    return this.wow_classes.filter(p => p.checked).map(function (item) {
                        return item.name;
                    })

                }
            },
            c_inventoryTypes: {
                get: function () {
                    return this.inventory_types.filter(p => p.checked).map(function (item) {
                        return item.name;
                    })

                }
            },
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
                this.$emit('change-filtered-classes', this.c_filteredClasses)
            },
            changeInventoryType: function () {
                this.$emit('change-inventory-type', this.c_inventoryTypes)
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

    .wow_class_select > div,  .inventory_type_select > div {
        display: inline-block;
    }

    .add-filter {
        border-radius: 1rem;
    }
</style>
