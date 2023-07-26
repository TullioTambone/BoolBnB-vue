<script>
import axios from 'axios';
import ttServices from "@tomtom-international/web-sdk-services";

import JumboComp from '../components/JumboComp.vue';
import CardComp from '../components/CardComp.vue';
import FooterComp from '../components/FooterComp.vue';


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
    JumboComp,
    CardComp,
    FooterComp
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
    <FooterComp/>
</template>



<style lang="scss" scoped>
    
</style>