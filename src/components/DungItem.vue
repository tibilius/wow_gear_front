<template>
    <li :class="[isItemInWishList? 'wish-list':'']"
        :title="[isItemInWishList? ' in Wish List. Click to remove':'Click to add inWish list']"
        @mouseover="hidden = false" @mouseleave="hidden = true"
        @click="toggleWishList"
    >
        <div class="icon"><img :src="mediaIcon(gItem.media)"></div>
        <h2 v-bind:class="gItem.dungeon.shortcut" :title="gItem.dungeon.name">{{ gItem.dungeon.shortcut}}</h2>
        <h3>{{ gItem.name }}</h3>
        <p v-if="gItem.inventory_type" class="inventory_type">
            <span class="subclass" title="subclass">{{gItem.item_subclass}}</span>
            <span class="type" title="inventory type"> {{gItem.inventory_type}}</span>
        </p>
        <p v-show="!isShowStats" style="cursor: pointer">Show more</p>
        <div class="stats" v-show="isShowStats">
            <p v-if="gItem.main_stat > 0" class="main_stat"><span>Main stat: </span> {{gItem.main_stat}}</p>
            <p v-if="gItem.stamina > 0" class="stamina"><span>Stamina:</span> {{gItem.stamina}}</p>
            <p v-if="gItem.haste > 0" class="haste"><span>Haste:</span> {{ gItem.haste}}</p>
            <p v-if="gItem.versatility > 0" class="versatility"><span>Versa: </span> {{ gItem.versatility}}</p>
            <p v-if="gItem.crit > 0" class="crit"><span>Crit: </span> {{ gItem.crit}}</p>
            <p v-if="gItem.mastery > 0" class="mastery"><span>Mastery: </span> {{ gItem.mastery}}</p>
            <p v-if="gItem.spells.length > 0" class="spells">{{ gItem.spells | concat}}</p>
        </div>

        <a :href="'http://wowhead.com/item=' + gItem.id" target="_blank" title="wowhead.com">wowhead</a>
    </li>
</template>

<script>
    export default {
        props: {
            gItem: {
                type: Object
            },
            alwaysExpand: Boolean
        },
        data() {
            return {
                hidden: true
            }
        },
        computed: {
            isShowStats() {
                return this.alwaysExpand || this.isItemInWishList || !this.hidden
            },
            isItemInWishList() {
                return this.$store.getters.getWishList.length
                    && this.$store.getters.getWishList.find(p => p.id === this.gItem.id)
            },
        },
        methods: {
            toggleWishList() {
                if (this.isItemInWishList) {
                    return this.removeFromWishList()
                }
                return this.addToWishList()
            },
            addToWishList() {
                this.$store.commit('addItemToWishList', this.gItem)
            },
            removeFromWishList() {
                this.$store.commit('removeFromWishList', this.gItem)
            },
            mediaIcon: function (some) {
                const mIcon = some.find(({key}) => key === 'icon')
                if (mIcon == undefined) {
                    return '@/assets/wow_classes/warrior.jpg';
                }
                return mIcon.value
            }
        },
        filters: {
            concat(a) {
                return a.join('')
            }
        }
    }
</script>

<style scoped>
    .icon {
        position: absolute;
        top: 20px;
        left: 20px;
    }

    p.inventory_type {
        color: #0ABFBC;
        width: 100%;
        float: right;
    }

    p > span {
        width: 40%;
        float: left;
    }

    span.subclass {
        font-size: 15px;
        color: #99625d;
        text-align: left;
    }

    span.type {
        font-size: 15px;
        text-align: right;
    }

    li {
        cursor: pointer;
        display: inline-block;
        width: 20%;
        min-width: 200px;
        max-width: 230px;
        padding: 80px 20px 40px;
        position: relative;
        vertical-align: top;
        margin: 10px;
        font-family: 'helvetica', san-serif;
        min-height: 15vh;
        background: #3c4545;
        border: 1px solid #252727;
        text-align: left;
    }

    li.wish-list {
        border: 2px #9b1bb1 solid;
    }

    li a {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #5d8c99;
    }

    li a:visited {
        color: #908f8f;
    }

    li h2 {
        color: #61724d;
        font-size: 70px;
        margin: 0;
        position: absolute;
        opacity: 0.2;
        top: 20px;
        right: 10px;
        transition: all 0.3s ease-in-out;
    }

    li h3 {
        font-size: 20px;
        color: #b7b7b7;
        margin-bottom: 5px;
    }

    li p {
        font-size: 16px;
        line-height: 18px;
        color: #b7b7b7;
        margin-top: 5px;
    }

    li:hover h2 {
        top: 0px;
        opacity: 0.8;
    }

    li:before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        z-index: -1;
        background: #fff;
        transform: skew(2deg, 2deg);
    }

    li:after {
        content: '';
        position: absolute;
        width: 40%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(255, 255, 255, 0.02);
    }

    li:nth-child(1):before {
        background: #C9FFBF;
        background: -webkit-linear-gradient(to right, #FFAFBD, #C9FFBF);
        background: linear-gradient(to right, #FFAFBD, #C9FFBF);
    }

    li:nth-child(2):before {
        background: #f2709c;
        background: -webkit-linear-gradient(to right, #ff9472, #f2709c);
        background: linear-gradient(to right, #ff9472, #f2709c);
    }

    li:nth-child(3):before {
        background: #c21500;
        background: -webkit-linear-gradient(to right, #ffc500, #c21500);
        background: linear-gradient(to right, #ffc500, #c21500);
    }

    li:nth-child(4):before {
        background: #FC354C;
        background: -webkit-linear-gradient(to right, #0ABFBC, #FC354C);
        background: linear-gradient(to right, #0ABFBC, #FC354C);
    }
</style>
