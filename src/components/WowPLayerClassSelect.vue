<template>
    <div class="container">
        <div v-for="(w_class, index) in filteredClasses" :key="index">
            <input type="checkbox" :id="'cb'+index" v-model="w_class.checked" @change="onChange"/>
            <label :for="'cb'+index" :title="w_class.name"><img :src="w_class.image"/></label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WowPLayerClassSelect",
        props: ['filteredClasses'],
        methods: {
            onChange: function () {
                let query = Object.assign({}, this.$route.query)
                const querySelectedClasses = JSON.stringify(this.$store.getters.getSelectedClasses)
                if (query.class !== querySelectedClasses ) {
                    this.$store.getters.getSelectedClasses.length
                        ? query.class = querySelectedClasses
                        : delete query.class
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
    div {
        display: inline-block;
    }

    input[type="checkbox"][id^="cb"] {
        display: none;
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
        content: "✓";
        background-color: grey;
        transform: scale(1);
    }

    :checked + label img {
        transform: scale(0.9);
        box-shadow: 0 0 5px #333;
        z-index: -1;
    }
</style>