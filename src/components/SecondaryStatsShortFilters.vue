<template>
    <div :class="hidden?'containerLine':'containerExpanded'">
        <p v-show="hidden" @click="hidden=false" title="Click to set which secondary stat should be on item"
           :class="hidden?'hidden':'expanded'">
            Secondary Stat <span class="selected">{{ $store.getters.getSelectedSecondaryStats | concat }}</span>
        </p>
        <p v-show="!hidden" @click="hidden=true" title="Click to toggle" :class="hidden?'hidden':'expanded'">
            Choose secondary stats</p>
        <transition name="fade" v-show="!hidden">
            <div v-show="!hidden">
                <div v-for="(secondary_stats,index) in secondaryStats" :key="index">
                    <input type="checkbox" :id="'secondary-stat'+index" v-model="secondary_stats.checked"
                           @change="onChange"/>
                    <label :for="'secondary-stat'+index"
                           :title="secondary_stats.name">{{secondary_stats.name}}</label>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "SecondaryStatsShortFilters",
        data() {
            return {
                hidden: true
            }
        },
        filters: {
            concat(a) {
                if (!a.length) {
                    return 'Any'
                }
                return a.map(p=> p + ' > 0 ').join(' and ')
            }
        },
        props: ['secondaryStats'],
        methods: {
            onChange: function () {
                let query = Object.assign({}, this.$route.query);
                const querySelectedSecondaryStats = JSON.stringify(this.$store.getters.getSelectedSecondaryStats)
                if (query.secondary_stats !== querySelectedSecondaryStats) {
                    this.$store.getters.getSelectedSecondaryStats.length
                        ? (query.secondary_stats = querySelectedSecondaryStats)
                        : (delete query.secondary_stats)

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
    div.containerExpanded {
        display: block;
        border: solid 1px #ccc;
    }

    div.containerLine {
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

    label {
        text-transform: capitalize;
    }

    .hidden:after, .expanded:after {
        margin-left: 5px;
    }

    .hidden:after {
        content: "🔽";
    }

    .expanded:after {
        content: "🔼";
    }

</style>