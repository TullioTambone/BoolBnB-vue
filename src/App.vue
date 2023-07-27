<script>

    import FooterComp from './components/FooterComp.vue';
import HeaderComp from './components/HeaderComp.vue';
    export default {
        components: {
    HeaderComp,
    FooterComp
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

    <FooterComp/>
</template>

<style lang="scss">
    @use './style/main.scss';
</style>