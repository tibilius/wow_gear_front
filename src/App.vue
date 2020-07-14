<template>
    <div id="app">
        <h1>Welcome to Wow BFA dungeon items finder</h1>
        <router-link to="/">Home</router-link>
        <router-link to="/wl">Wish List</router-link>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
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
    #app > h1{
        margin: 0;
        padding: 2rem;
    }
    body {
        margin: 0;
    }


</style>
