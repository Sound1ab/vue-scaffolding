<template>
    <component
        :is="type"
        class="home"
    >
        <slot/>
    </component>
</template>

<script>
export default {
    name: 'Home',
    props: {
        type: {
            type: String,
            default: 'div'
        }
    }
};
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    background-color: pink;
}
</style>
