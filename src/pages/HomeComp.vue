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
                console.log(res.data);
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
                    const datalist = document.getElementById("datalistOptions");

                    if (results.length) {
                        for (const elem of results) {
                            datalist.innerHTML += `<option value="${elem.address.freeformAddress}">${elem.address.freeformAddress}</option>`;
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
            }, 4000 );
        }
    }
}
</script>
<template>
   
    <!-- jumbo -->
    <JumboComp 
    v-if="apartments.length"
        :image="apartments[store.activeSlide].cover"
        :title="apartments[store.activeSlide].title"
        @autocomplete="autocomplete"
    />

    <!-- the best team -->
    <div class="py-5">
        <TeamComp/>
    </div>

    <!-- sponsored -->


    <!-- apartments -->
    <div class="container mt-5">
        <div class="row">
            <CardComp  
                v-for="(elem, index) in apartments" :key='index'
                :propsCard="elem"
            />
        </div>
    </div>
   
</template>



<style lang="scss" scoped>
@import '../style/main.scss';


</style>