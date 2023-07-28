<script>
import axios from 'axios';
import ttServices from "@tomtom-international/web-sdk-services";
import { store } from '../store';

import JumboComp from '../components/JumboComp.vue';
import CardComp from '../components/CardComp.vue';
import TeamComp from '../components/TeamComp.vue';
    export default {
    name: "HomeComp",
    components: {
    JumboComp,
    CardComp,
    TeamComp
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
        this.autoScroll();
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
        autoScroll() {
            
            this.autoscroll = setInterval( () => {
                store.activeSlide++;
    
                if ( store.activeSlide === this.apartments.length ) {
    
                    store.activeSlide = 0;
                }
            }, 2000 );
        }
    }
}
</script>
<template>
    <!-- <h1>home page</h1> -->
    <JumboComp 
    v-if="apartments.length"
        :image="apartments[store.activeSlide].cover"
        :title="apartments[store.activeSlide].title"
    />

    <div class="py-5">
        <TeamComp/>
    </div>

    <div class="container">
        <div class="row">
            <CardComp v-for="(elem, index) in apartments" :key='index' :propsCard="elem"/>
        </div>
    </div>
   
</template>



<style lang="scss" scoped>

</style>