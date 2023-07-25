<script>
import axios from 'axios';
import ttServices from "@tomtom-international/web-sdk-services";

import JumboComp from '../components/JumboComp.vue';
    export default {
    name: "HomeComp",
    data() {
        return {
            apartments: [],
            address: "",
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
                console.log(res);
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
    },
    components: { 
        JumboComp 
    }
}
</script>
<template>
    <h1>home page</h1>
    <JumboComp/>
    <div v-if="apartments" class="container">
        <div class="row">

            <!-- search -->
            <div class="col-12 col-md-12 col-lg-12 d-flex align-items-center">
                
                <input class="form-control me-2 w-75" id="search" name="search" type="search" placeholder="Inserisci la città o l'indirizzo" aria-label="Search" v-model="this.address" @keyup="autocomplete()" list="datalistOptions">
                <datalist id="datalistOptions">                           
                </datalist>
                <router-link class="btn btn-outline-success" to="/search">
                    Cerca
                </router-link>
            </div>

            <div v-for="(elem, index) in apartments" :key='index' class="col-12 col-md-6 col-lg-4">
                <h3>{{ elem.title }}</h3>
                <img class="img-fluid" :src="`${this.baseUrl}/storage/${elem.cover}`" :alt="elem.title">
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>