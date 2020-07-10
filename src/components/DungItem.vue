<template>
    <li>
        <div class="icon"><img :src="mediaIcon(g_item.media)"></div>
        <h2 v-bind:class="g_item.dungeon.shortcut">{{ g_item.dungeon.shortcut}}</h2>
        <h3>{{ g_item.name }}</h3>
        <div>
            <p v-if="g_item.inventory_type" class="inventory_type">
                <span class="subclass">{{g_item.item_subclass}}</span>
                <span class="type">{{g_item.inventory_type}}</span>
            </p>
            <p v-if="g_item.main_stat > 0" class="main_stat"><span>Main stat: </span> {{g_item.main_stat}}</p>
            <p v-if="g_item.stamina > 0" class="stamina"><span>Stamina:</span> {{g_item.stamina}}</p>
            <p v-if="g_item.haste > 0" class="haste"><span>Haste:</span> {{ g_item.haste}}</p>
            <p v-if="g_item.versatility > 0" class="versatility"><span>Versa: </span> {{ g_item.versatility}}</p>
            <p v-if="g_item.crit > 0" class="crit"><span>Crit: </span> {{ g_item.crit}}</p>
            <p v-if="g_item.mastery > 0" class="mastery"><span>Mastery: </span> {{ g_item.mastery}}</p>
            <p v-if="g_item.spells.length > 0" class="spells">{{ g_item.spells | concat}}</p>

        </div>
        <button> Add to wish list</button>
        <a :href="'http://wowhead.com/item=' + g_item.id" target="_blank">wowhead</a>

    </li>
</template>

<script>
    export default {
        props: {
            g_item: {
                type: Object
            }
        },
        methods: {
            mediaIcon: function (some) {
                const mIcon =  some.find(({key}) => key === 'icon')
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
        float: left;
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
        display: inline-block;
        width: 20%;
        min-width: 200px;
        max-width: 230px;
        padding: 80px 20px 40px;
        position: relative;
        vertical-align: top;
        margin: 10px;
        font-family: 'helvetica', san-serif;
        min-height: 25vh;
        background: #3c4545;
        border: 1px solid #252727;
        text-align: left;
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
        font-size: 85px;
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

    li button {
        background: transparent;
        border: 1px solid #b7b7b7;
        padding: 10px 20px;
        color: #b7b7b7;
        border-radius: 3px;
        position: relative;
        transition: all 0.3s ease-in-out;
        transform: translateY(-40px);
        opacity: 0;
        cursor: pointer;
        overflow: hidden;
    }

    li button:before {
        content: '';
        position: absolute;
        height: 100%;
        width: 120%;
        background: #b7b7b7;
        top: 0;
        opacity: 0;
        left: -140px;
        border-radius: 0 20px 20px 0;
        z-index: -1;
        transition: all 0.3s ease-in-out;

    }

    li:hover button {
        transform: translateY(5px);
        opacity: 1;
    }

    li button:hover {
        color: #40532f;
    }

    li button:hover:before {
        left: 0;
        opacity: 1;
    }

    li:hover h2 {
        top: 0px;
        opacity: 0.6;
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
