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
