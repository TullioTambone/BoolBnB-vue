<script>
import axios from 'axios';

    export default {

        data() {
            return {
                apartments:[],
                baseUrl: 'http://127.0.0.1:8000',

            }
        },
        mounted(){
            this.getApartment()
        },
        methods: {
            getApartment(){
                axios.get(`${this.baseUrl}/api/apartments`).then((res) =>{
                    this.apartments = res.data.apartment
                })
            }
        }

    }
</script>
<template>
    <h1>ciaooooo</h1>
    <div class="container">
        <div class="row">
            <div v-for="(elem, index) in this.apartments" :key='index' class="col-12 col-md-6 col-lg-4">
                <h3>{{ elem.title }}</h3>
                <img class="img-fluid" :src="`${this.baseUrl}/storage/${elem.cover}`" :alt="title">
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>