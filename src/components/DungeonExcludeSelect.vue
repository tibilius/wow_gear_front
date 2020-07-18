<template>
    <div :class="hidden?'containerLine':'containerExpanded'">
        <p v-show="hidden" @click="hidden=false" :class="hidden?'dungeonHidden':'dungeonExpanded'"
           title="Click to expand">
            Excluded Dungeons <span class="excluded">{{ $store.getters.getSelectedDungeon | concat }}</span>
        </p>
        <p v-show="!hidden" @click="hidden=true" title="Click to toggle"
           :class="hidden?'dungeonHidden':'dungeonExpanded'"
        > Exclude dungeon from search</p>

        <div v-show="!hidden" @blur="setTimeout(() => {console.log('out');this.hidden=true} , 1000)">
            <div v-for="(dungeon,index) in dungeons" :key="index">
                <input type="checkbox" :id="'dungeon-filter'+index" v-model="dungeon.checked" @change="onChange"/>
                <label :for="'dungeon-filter'+index" :title="dungeon.fullName">
                    <img :src="dungeon.image"/>
                    <p style="display: block">{{dungeon.name}}</p>
                </label>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "dungeonExcludeSelect",
        props: ['dungeons'],
        data() {
            return {
                hidden: true
            }
        },
        filters: {
            concat: function (value) {
                if (!value.length) {
                    return 'No excluded'
                }
                return value.join(", ");
            }
        },
        methods: {
            onChange: function () {
                let query = Object.assign({}, this.$route.query);
                const querySelectedDungeon = JSON.stringify(this.$store.getters.getSelectedDungeon)
                if (query.dungeon !== querySelectedDungeon) {
                    this.$store.getters.getSelectedDungeon.length
                        ? (query.dungeon = querySelectedDungeon)
                        : (delete query.dungeon)

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

    div > div {
        display: inline-block;
    }

    .excluded {
        color: #a048af;
    }

    .dungeonExpanded, .dungeonHidden {
        cursor: pointer;
    }

    .dungeonHidden:after, .dungeonExpanded:after {
        margin-left: 5px;
    }

    .dungeonHidden:after {
        content: "🔽";
    }

    .dungeonExpanded:after {
        content: "🔼";
    }

    input[type="checkbox"][id^="dungeon-filter"] {
        display: none;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
    {
        opacity: 0;
    }

    label {
        border: 1px solid #2c3138;
        padding: 10px;
        display: block;
        position: relative;
        margin: 10px;
        cursor: pointer;
    }

    label:before {
        background-color: white;
        color: white;
        content: " ";
        display: block;
        border-radius: 50%;
        border: 1px solid grey;
        position: absolute;
        top: -5px;
        left: -5px;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 28px;
        transition-duration: 0.4s;
        transform: scale(0);
    }

    label img {
        height: 50px;
        width: 50px;
        transition-duration: 0.2s;
        transform-origin: 50% 50%;
        border-radius: 2rem;
    }

    :checked + label {
        border-color: #2c3138;
    }

    :checked + label:before {
        content: "✗";
        background-color: grey;
        transform: scale(1);
    }

    :checked + label img {
        transform: scale(0.9);
        box-shadow: 0 0 5px #333;
        z-index: -1;
    }

    label > p {
        margin: 0;
        padding: 0;
        color: #ccc;

    }
</style>