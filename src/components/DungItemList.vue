<template>
    <div>
        <p style="display:inline;cursor: pointer;"
           v-show="!inWishList"
           @click="alwaysExpand=!alwaysExpand"
           :class="alwaysExpand?'alwaysExpand':'alwaysHide'">
            {{alwaysExpand ? 'Click to hide item stats' : 'Click to expand item stats'}}
        </p>
        <ul class="items tilesWrap">
            <DungItem
                    v-for="gItem in gItems"
                    :key="gItem.id"
                    v-bind:gItem="gItem"
                    v-bind:filteredClasses="filteredClasses"
                    v-bind:alwaysExpand="alwaysExpand"
            />
        </ul>
    </div>
</template>

<script>
    import DungItem from "@/components/DungItem"

    export default {
        props: {
            gItems: Array,
            filteredClasses: Array,
            inWishList:Boolean,
        },
        data() {
            return {
                alwaysExpand: false
            }
        },
        components: {DungItem},
        watch: {
            alwaysExpand: function () {
                localStorage.dungeon_items_alwaysExpand = this.alwaysExpand
            }
        },
        mounted() {
            if (localStorage.dungeon_items_alwaysExpand) {
                this.alwaysExpand = JSON.parse(localStorage.dungeon_items_alwaysExpand)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
        background: #262a2b;
    }

    .tilesWrap {
        /*padding: 0;*/
        /*margin: 50px auto;*/
        margin-bottom: 0;
        /*padding-bottom: 50px;*/
        list-style: none;
        text-align: center;
    }
</style>
