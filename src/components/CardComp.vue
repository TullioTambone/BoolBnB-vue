<script>
import axios from 'axios';
import { store } from '../store';



    export default {
    name: "CardComp",
    props: ["propsCard"],
    data() {
        return {
            store
        };
    },
    mounted() {
        
    },
    methods: {
 
    },
    components: { 

    }
}
</script>
<template>
    <div v-if="propsCard" class="container">
        <div class="row">
                <div class="col-12 col-md-6 col-lg-4 card mt-5">
                    <div class="content">
                        <div class="front">
                            <img :src="`${store.baseUrl}/storage/${propsCard.cover}`"   class="card-img-top" alt="propsCard.title">
                        </div>
                        <div class="back">
                            <h5 class="card-title">{{ propsCard.title }}</h5>
                            <p class="card-text">{{ propsCard.description }}</p>
                            <li class="list-group-item">{{ propsCard.address }}</li>
                            <li class="list-group-item">n stanze da letto: {{ propsCard.bedrooms }} <br>
                                n bagni {{ propsCard.bathrooms }}</li>
                            <li class="list-group-item">{{ propsCard.price }}</li>
                         </div>
                    </div>
                </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>

</style>