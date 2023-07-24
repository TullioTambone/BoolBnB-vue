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
    <HeaderComp/>

    <main>
        <router-view></router-view>
    </main>


</template>

<style lang="scss">
    @use './style/main.scss';
</style>