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
    <div id="nav">
        <HeaderComp/>
    </div>

    <main>
        <router-view></router-view>
    </main>

    <FooterComp/>

    <!-- arrow up -->
    <div id="arrow-up" class="position-fixed">
        <a href="#nav">
            <i class="fa-solid fa-arrow-up"></i>
        </a>
    </div>
</template>

<style lang="scss">
    @use './style/main.scss';
    
    #arrow-up {
        right: 30px;
        bottom: 30px;

        a {
            background-color: #C6AB7C;
            aspect-ratio: 1;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: #ffffff;
            border-radius: 50%;
            font-size: 1.2rem;
        }
    }
</style>