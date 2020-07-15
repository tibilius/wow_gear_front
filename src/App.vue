<template>
    <div id="app">
        <h1>Welcome to Wow BFA dungeon items finder</h1>
        <nav>
            <router-link to="/" @click.native="skip" :class="$route.name === 'home' && 'router-link-active'" exact>
                Equip! {{$store.getters.getApiEntitiesCount? $store.getters.getApiEntitiesCount + " found":''}}
            </router-link>
            <router-link to="/wl" @click.native.prevent="skip" exact>
                Wish List {{ $store.getters.getWishListCount ? "(" + $store.getters.getWishListCount + ")" : ""}}

            </router-link>
        </nav>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        methods: {
            skip: function (e) {
                e.preventDefault()
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #125aa3;
        margin: 0px;
        background-color: #2c3138;
    }
    html, body,#app{
        /*display: contents;*/
        min-height: 100vh;
    }
    #app > h1{
        margin: 0;
        padding: 2rem;
    }
    body {
        margin: 0;
    }

    /*menu*/
    nav {
        display: inline-block;
        margin: 10px auto 45px;
        background-color: transparent;
        box-shadow: 0 1px 1px #ccc;
        border-radius: 2px;
        width: 100%;
    }

    nav a {
        display: inline-block;
        padding: 10px 30px;
        color: #7b7b7b;
        font-weight: bold;
        font-size: 16px;
        text-decoration: none !important;
        line-height: 1;
        text-transform: uppercase;
        background-color: transparent;

        -webkit-transition: background-color 0.25s;
        -moz-transition: background-color 0.25s;
        transition: background-color 0.25s;
    }

    nav > a.router-link-active {
        color: #2c3138;
        background-color: #7d9098;
    }

    nav a:first-child {
        border-radius: 2px 0 0 2px;
    }

    nav a:last-child {
        border-radius: 0 2px 2px 0;
    }


</style>
