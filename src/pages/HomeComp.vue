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
                // this.apartments = res.data.apartment.data;
                this.apartments = res.data.apartment.data
                store.sponsoredApartments = res.data.apartment.data.filter(e => e.subscriptions.length !== 0).sort((a, b) => b.subscriptions[0].id - a.subscriptions[0].id);
                store.nonSponsoredApartments = res.data.apartment.data.filter(e => e.subscriptions.length === 0);
                console.log(store.sponsoredApartments);
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
    <!-- <div class="py-5">
        <TeamComp/>
    </div> -->

    <!-- apartments -->
    <div class="container my-5">
        <div class="row my-5 border-bottom border-top round">
            <span class="text-end text-secondary mb-2">sponsorizzati</span>
            <CardComp  
                v-for="(elem, index) in store.sponsoredApartments" :key='index'
                :propsCard="elem"
            />
        </div>
        <div class="row">
            <CardComp  
                v-for="(elem, index) in store.nonSponsoredApartments" :key='index'
                :propsCard="elem"
            />
        </div>
    </div>
   
</template>

<style lang="scss" scoped>
@import '../style/main.scss';

</style>