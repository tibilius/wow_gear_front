<template>
    <div :class="hidden?'containerLine':'containerExpanded'">
        <p v-show="hidden" @click="hidden=false" title="Click to set. e.g on item with haste 10 and crit 50, main secondary stat would be crit" :class="hidden?'hidden':'expanded'">
            Main Secondary Stat <span class="selected">{{ $store.getters.getSelectedSecondaryMainStat | concat }}</span>
        </p>
        <p v-show="!hidden" @click="hidden=true" title="Click to toggle" :class="hidden?'hidden':'expanded'">
        Choose main secondary stat</p>
        <transition name="fade" v-show="!hidden">
            <div v-show="!hidden">
                <div v-for="(secondary_main_stat,index) in secondaryMainStat" :key="index">
                    <input type="checkbox" :id="'secondary-main-stat'+index" v-model="secondary_main_stat.checked"
                           @change="onChange"/>
                    <label :for="'secondary-main-stat'+index"
                           :title="secondary_main_stat.name">{{secondary_main_stat.name}}</label>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "SecondaryMainStatFilter",
        data() {
            return {
                hidden: true
            }
        },
        filters: {
            concat(a) {
                if (!a.length){
                    return 'Any'
                }
                return a.join(' ')
            }
        },
        props: ['secondaryMainStat'],
        methods: {
            onChange: function () {
                let query = Object.assign({}, this.$route.query);
                const querySelectedSecondaryMainStat = JSON.stringify(this.$store.getters.getSelectedSecondaryMainStat)
                if (query.secondary_main_stat !== querySelectedSecondaryMainStat) {
                    this.$store.getters.getSelectedSecondaryMainStat.length
                        ? (query.secondary_main_stat = querySelectedSecondaryMainStat)
                        : (delete query.secondary_main_stat)

                    this.$router.push({path: this.$route.path, query: query}).catch(() => {
                    })
                }
            }
        },

        mounted() {
            if (this.$store.getters.isInited) {
                this.onChange()
            }
        }
    }
</script>

<style scoped>
    div.containerExpanded{
        display: block;
        border: solid 1px #ccc;
    }
    div.containerLine{
        margin-right: 10px;
    }
    div {
        display: inline-block;
        padding: 5px;
        cursor: pointer;
    }
    .selected {
        text-transform: uppercase;
        color: #a048af;
    }
    label{
        text-transform: capitalize;
    }
    .hidden:after, .expanded:after{
        margin-left: 5px ;
    }
    .hidden:after{
        content: "🔽";
    }
    .expanded:after{
        content: "🔼";
    }

</style>