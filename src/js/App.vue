<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import store from './vuex/index';

export default {
    name: 'App',
    store
};
</script>

<style lang="scss" type="text/scss" scoped>
#app {
    position: relative;
    width: 100vw;
    height: 100vh;
}
</style>
