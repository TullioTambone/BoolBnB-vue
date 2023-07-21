<script>
import axios from 'axios';
import ttServices from "@tomtom-international/web-sdk-services"

    export default {
        name: "SearchComp",
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

                // tom tom
                ttServices.services.geocode({
                    batchMode: 'async',
                    key: "74CVsbN34KoIljJqOriAYN2ZMEYU1cwO",
                    query: address,
                    countrySet: 'IT',
                    language: 'it-IT',
                }).then(
                    function (response) {
                        
                        const results = response.results;
                        console.log(results)
                        
                    }
                )
            }
        }

    }
</script>
<template>
    <div class="container">
        <h2>Ricerca avanzata</h2>

        <!-- search -->
        <div class="row">
            <div class="col-2 mb-5">
                <label for="types" class="form-label fw-semibold">Ricerca</label>

                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search"  @keyup.enter="search">
                
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div v-for="(elem, index) in this.apartments" :key='index' class="col-12 col-md-6 col-lg-4">
                    <h3>{{ elem.title }}</h3>
                    <img class="img-fluid" :src="`${this.baseUrl}/storage/${elem.cover}`" :alt="title">
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>