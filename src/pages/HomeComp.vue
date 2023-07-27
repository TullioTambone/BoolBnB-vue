<script>
import axios from 'axios';
import ttServices from "@tomtom-international/web-sdk-services";
import { store } from '../store';

import JumboComp from '../components/JumboComp.vue';
import CardComp from '../components/CardComp.vue';
    export default {
    name: "HomeComp",
    components: { 
        JumboComp,
        CardComp
    },
    data() {
        return {
            store,
            apartments: [],
            baseUrl: "http://127.0.0.1:8000"
        };
    },
    mounted() {
        this.getApartment();
    },
    methods: {
        getApartment() {
            axios.get(`${this.baseUrl}/api/apartments`).then((res) => {
                this.apartments = res.data.apartment.data;
                console.log(this.apartments);
            });
        },
        autocomplete() {
            // Ottenimento dell'indirizzo dal campo input
            const search = document.querySelector("#search");
            if (search.value) {
                ttServices.services.geocode({
                    batchMode: "async",
                    key: "74CVsbN34KoIljJqOriAYN2ZMEYU1cwO",
                    query: search.value,
                    countrySet: "IT",
                    language: "it-IT",
                }).then(function (response) {
                    const results = response.results;
                    console.log(results);
                    // se abbiamo dei risultati ottenuti
                    if (results.length) {
                        for (const elem of results) {
                            document.getElementById("datalistOptions").innerHTML += `<option value="${elem.address.freeformAddress}">${elem.address.freeformAddress}</option>`;
                        }
                    }
                });
            }
        },
    }
}
</script>
<template>
    <!-- <h1>home page</h1> -->
    <JumboComp :propsApartments="this.apartments"/>
    <div class="container">
        <div class="row">
            <CardComp v-for="(elem, index) in apartments" :key='index' :propsCard="elem"/>
        </div>
    </div>
   
        

            <!-- search -->
            <!-- <div class="col-12 col-md-12 col-lg-12 d-flex align-items-center">
                
                <input class="form-control me-2 w-75" id="search" name="search" type="search" placeholder="Inserisci la città o l'indirizzo" aria-label="Search" v-model="this.address" @keyup="autocomplete()" list="datalistOptions">
                <datalist id="datalistOptions">                           
                </datalist>
                <router-link class="btn btn-outline-success" to="/search">
                    Cerca
                </router-link>
            </div> -->

            <!-- <div v-for="(elem, index) in apartments" :key='index' class="col-12 col-md-6 col-lg-4">
                <h3>{{ elem.title }}</h3>
                <img class="img-fluid" :src="`${this.baseUrl}/storage/${elem.cover}`" :alt="elem.title">
            </div> -->

                <!-- <div  v-for="(elem, index) in apartments" :key='index' class="card col-12 col-md-6 col-lg-4 gap-3 mt-4" style="width: 18rem;">
                    <img :src="`${this.baseUrl}/storage/${elem.cover}`"   class="card-img-top" alt="elem.title">
                    <div class="card-body">
                        <h5 class="card-title">{{ elem.title }}</h5>
                        <p class="card-text">{{ elem.description }}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{{ elem.address }}</li>
                        <li class="list-group-item">n stanze da letto: {{ elem.bedrooms }} <br>
                        n bagni {{ elem.bathrooms }}</li>
                        <li class="list-group-item">{{ elem.price }}</li>
                        <li  class="list-group-item"></li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div> -->

                <!-- ultimo commento -->
                 
                <!-- <div v-for="(elem, index) in apartments" :key='index' class="col-12 col-md-6 col-lg-4 card mt-5">
                    <div class="content">
                        <div class="front">
                            <img :src="`${this.baseUrl}/storage/${elem.cover}`"   class="card-img-top" alt="elem.title">
                        </div>
                        <div class="back">
                            <h5 class="card-title">{{ elem.title }}</h5>
                            <p class="card-text">{{ elem.description }}</p>
                            <li class="list-group-item">{{ elem.address }}</li>
                            <li class="list-group-item">n stanze da letto: {{ elem.bedrooms }} <br>
                                n bagni {{ elem.bathrooms }}</li>
                            <li class="list-group-item">{{ elem.price }}</li>
                         </div>
                    </div>
                </div> -->
</template>



<style lang="scss" scoped>

</style>