<script>
import axios from 'axios';

    export default {
        name:'HomeComp',
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
                    this.apartments = res.data.apartment.data
                    console.log(res)
                })
            }
        }

    }
</script>
<template>
    <h1>home page</h1>
    <div v-if="apartments" class="container">
        <div class="row">
            <div v-for="(elem, index) in apartments" :key='index' class="col-12 col-md-6 col-lg-4">
                <h3>{{ elem.title }}</h3>
                <img class="img-fluid" :src="`${this.baseUrl}/storage/${elem.cover}`" :alt="elem.title">
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>