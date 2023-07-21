<script>

    import HeaderComp from './components/HeaderComp.vue';
    export default {
        components: {
            HeaderComp,

        },
        data() {
            return {

            }
        },
    }
</script>

<template>
    <HeaderComp />

    <router-view></router-view>


</template>

<style lang="scss">
    @use './style/main.scss';
</style>