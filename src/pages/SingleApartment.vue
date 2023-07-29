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
            loading: false,
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

            this.loading = true;

            axios.post(`${store.baseUrl}/api/contacts`, data ).then( response => {

                this.success = response.data.success;
                if(this.success) {
                    this.name = '',
                    this.email = '',
                    this.message = ''
                }
            }).finally(() => {
                // Imposta loading a false dopo aver ricevuto la risposta
                this.loading = false;
            });
            
        }
    }
}
</script>

<template>
    <div class="container">

        <div v-if="apartment" class="row">
            <div class="col-12 col-md-6 col-lg-6">
    
                <!-- cover -->
                <div v-if="apartment.cover">
                    <img class="img-fluid w-100" v-if="apartment.cover.includes('apartment_cover_img')" :src="`${store.baseUrl}/storage/${apartment.cover}`"  alt="">
                    <img v-else class="img-fluid w-100" :src="apartment.cover" :alt="apartment.title">
                </div>
                
              
                <div class="d-flex over">
                    
                <!-- images -->
                <div v-for="( elem, index ) in apartment.images" :key="index" class="d-flex me-3 mt-3">  
                    <div class="box margine">                              
                        <img class="d-block" :src="`${store.baseUrl}/storage/${elem.url}`" :alt="apartment.title">
                    </div>
                </div>
                <!-- mappa -->
                </div>
                     <div id='map' class='map mt-5 margine' style="height: 200px;"></div>
                </div>
            <!-- details -->
            <div class="col-12 col-md-6 col-lg-6 ">
                <h1 class="border-bottom">{{ apartment.title }}</h1>
                <span class="d-block">
                    <i class="fa-solid fa-location-dot"></i> {{ apartment.address }}
                    </span>
                <h4 class="mt-2">Info Appartamento</h4>
                <p>{{ apartment.description }}</p>
                <div>
                        <span class="d-block">
                           <strong>Stanze:</strong>  {{ apartment.rooms }}
                        </span>
                        <span class="d-block">
                           <strong>Stanze letto:</strong>  {{ apartment.bedrooms }}
                        </span>
                        <span class="d-block">
                           <strong>Bagni:</strong>  {{ apartment.bathrooms }}
                        </span>
                        <span class="d-block">
                          <strong>Metri quadri:</strong>   {{ apartment.square_meters }}mq
                        </span>
                        <span v-if="apartment.price" class="d-block">
                          <strong>Prezzo:</strong>   {{ apartment.price }}&euro;
                        </span>
                        <span class="d-block">
                           <strong>visibilità:</strong>  {{ (apartment.visibility) ? 'visibile' : 'non visibile' }}
                        </span>
                        <h5 class="mt-2"> Servizi della struttura</h5>
                            <span v-for="( elem, index ) in apartment.services" :key="index" class="p-1 mt-1 card d-inline"> 
                                <i :class="`fa-solid ${ elem.icon } me-1`"></i> {{  elem.name }} 
                            </span>
                </div>
                <!-- form contatta la truttura -->
                <form class="card p-4 mt-5 mb-4 margine" action="" @submit.prevent="sendForm()">
                    <h3 class="">Contatta la struttura</h3>
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
    
                    <!-- <button type="submit" class="btn">
                        Invia
                    </button> -->
                    <button type="submit" class="btn" :class="{ 'btn-primary': !loading, 'btn-secondary': loading }" :disabled="loading">
                        <span v-if="!loading">Invia</span>
                        <span v-else>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span role="status">Caricamento...</span>
                        </span>
                    </button>
                </form>
            </div>    
        </div>
    </div>
</template>

<style lang="scss" scoped>
 .container {
    margin-top: 100px;
    .box {
        img {
            width: 100px;
            height: 100px;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
            cursor: pointer;

            &:hover {
                transform: translateY(-5px);
                transition: transform 0.3s ease;
}
        }
    }
    img {
        border-radius: 10px;
    }
}
.over {
    overflow-x: auto;
}
form {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

    .btn {
        background-color: #C6AB7C;
        color: white;
    }
}
.map {
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.margine {
    margin-top: 40px;
}
 
</style>