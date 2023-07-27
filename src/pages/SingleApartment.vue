<script>
import tt from "@tomtom-international/web-sdk-maps";
import ttServices from "@tomtom-international/web-sdk-services";
import axios from 'axios';
import { store } from '../store';

export default{
    name:"SingleApartment",
    data(){
        return{
            store,
            apartment: [],            
            name: '',
            email: '',
            message: '',
            success: false
        }
    },
    mounted(){
        this.getSingleApartment()
    },
    methods:{

        async getMap(longitude, latitude) {
            //    PROVE PER INTEGRAZIONE MAPPA E PUNTATORE MAPPA

            //document.querySelector('.mapboxgl-marker').classList.add("position-absolute");
            const point =  [longitude, latitude];

            console.log(point);
            try {
                let map = tt.map({
                    key: "74CVsbN34KoIljJqOriAYN2ZMEYU1cwO",
                    container: 'map',
                    ///dragPan: !isMobileOrTablet(),
                    center: point,
                    zoom: 15
                });
                
                map.addControl(new tt.FullscreenControl());
                map.addControl(new tt.NavigationControl());
                
                map.on('load', () => {    
                        new tt.Marker().setLngLat(point).addTo(map);
                })    
                
            } catch (error) {
                console.error('Si è verificato un errore nella richiesta al servizio di geocodifica di TomTom:', error);
            }
        },
        async getTom(address){

            try {
                const response = await ttServices.services.geocode({
                    batchMode: 'async',
                    key: "74CVsbN34KoIljJqOriAYN2ZMEYU1cwO",
                    query: address,
                    countrySet: 'IT',
                    language: 'it-IT',
                }).then( (response) => {
                        
                        const results = response.results;
                        // console.log(results)
                        
                        // se abbiamo dei risultati ottenuti
                        if (results.length)  {   

                            const userAddressLower = address.toLowerCase();

                            let latitude, longitude
                
                            for (const elem of results) {                          
                                            
                                let resultAddressLower = elem.address.freeformAddress.toLowerCase();
                
                                // Controlla se l'indirizzo ottenuto contiene la stringa inserita dall'utente
                                if (resultAddressLower.includes(userAddressLower)) {
                                    latitude = elem.position.lat;
                                    longitude = elem.position.lng;                
                                    break; 
                                } 
                            }
                            
                            if(latitude && longitude) {
                                this.getMap(longitude, latitude)
                            }
                        } else {
                            console.error('Nessun risultato trovato per l\'indirizzo fornito.');
                        }
                    }
                )
            } catch (error) {
                console.error('Si è verificato un errore nella richiesta al servizio di geocodifica di TomTom:', error);
            }
        },
        // chiamata api per il singolo appartamento
        async getSingleApartment(){
            try {
                const response = await axios.get(`${store.baseUrl}/api/apartments/${this.$route.params.slug}`)
           
                this.apartment = response.data.apartment;

                if (this.apartment.address) {
                    this.getTom(this.apartment.address)
                }
            } catch (error) {
                if(this.res.data.data.success){
                    this.$router.push({name: 'NotFound'})
                }
            }
        },

        // invio del form per mandare l'email
        sendForm() {

            const data = {
                name: this.name,
                email: this.email,
                message: this.message,
                apartment_id: this.apartment.id
            }      

            axios.post(`${this.baseUrl}/api/contacts`, data ).then( response => {

                this.success = response.data.success;
                if(this.success) {
                    this.name = '',
                    this.email = '',
                    this.message = ''
                }
            });
            
        }
    }
}
</script>

<template>
    <div class="container">

        <div v-if="apartment" class="row">
            <div class="col-12 col-md-6 col-lg-6 text-center">
    
                <!-- cover -->
                <div v-if="apartment.cover">
                    <img v-if="apartment.cover.includes('apartment_cover_img')" :src="`${store.baseUrl}/storage/${apartment.cover}`"  alt="">
                    <img v-else class="img-fluid" :src="apartment.cover" :alt="apartment.title">
                </div>
                    
                <!-- images -->
                <div class="d-flex justify-content-center mt-3">
                    
                    <!-- carousel -->
                    <div v-if="apartment.images" class="carousel slide col-12 col-md-6 col-lg-6" id="carouselExampleAutoplaying" data-bs-ride="carousel">
                        <div class="carousel-inner">
    
                            <!-- images -->
                            <div v-for="( elem, index ) in apartment.images" :key="index" class="carousel-item" :class="index === 0 ? 'active' : ''">                                
                                <img class="d-block w-100" :src="`${store.baseUrl}/storage/${elem.url}`" :alt="apartment.title">
                            </div>
                        </div>
    
                        <!-- prev button -->
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
    
                        <!-- next button -->
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>                
                </div>
            </div>
    
            <!-- details -->
            <div class="col-12 col-md-6 col-lg-6">
                <h1 class="border-bottom">{{ apartment.title }}</h1>
                <div>
                    <p>{{ apartment.description }}</p>
                    <span class="d-block">
                        numero stanza: {{ apartment.rooms }}
                    </span>
                    <span class="d-block">
                        numero stanze letto: {{ apartment.bedrooms }}
                    </span>
                    <span class="d-block">
                        numero bagni: {{ apartment.bathrooms }}
                    </span>
                    <span class="d-block">
                        metri quadri: {{ apartment.square_meters }}mq
                    </span>
                    <span class="d-block">
                    indirizzo: {{ apartment.address }}
                    </span>
                    <span v-if="apartment.price" class="d-block">
                        prezzo: {{ apartment.price }}&euro;
                    </span>
                    <span class="d-block">
                        visibilità: {{ (apartment.visibility) ? 'visibile' : 'non visibile' }}
                    </span>
                    <h5 class="mt-2"> Servizi</h5>
    
                    <span v-for="( elem, index ) in apartment.services" :key="index" class="d-block mt-1"> 
                        <i class="fa-solid {{ elem.icon }} me-1 "></i> {{  elem.name }} 
                    </span>
                </div>
            </div>    
        </div>
    </div>

    <!-- mappa -->
    <div class="container">

        <div id='map' class='map' style="height: 350px;"></div>
    </div>

    <div class="container p-5">
        <h3>Contattami</h3>

        <div class="row">
            <div class="col-12 col-md-6 col-lg-6">

                <form action="" @submit.prevent="sendForm()">
                    <div class="mb-3">
                        <label for="" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="name" placeholder="Nome" name="name" v-model="name">
                    </div>
    
                    <div class="mb-3">
                        <label for="" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email" v-model="email">
                    </div>
    
                    <div class="mb-3">
                        <div class="mb-3">
                            <label for="" class="form-label">Messaggio</label>
                            <textarea class="form-control" id="message" rows="3" name="message" v-model="message"></textarea>
                        </div>
                    </div>

                    <input type="hidden" name="apartment_id" v-model="apartment.id">
    
                    <button type="submit" class="btn btn-primary">
                        Invia
                    </button>
    
                </form>
            </div>
        </div>
    </div>


        
</template>

<style lang="scss" scoped>

</style>