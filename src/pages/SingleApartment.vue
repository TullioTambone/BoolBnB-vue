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
                        console.log(results)
                        
                        // se abbiamo dei risultati ottenuti
                        if (results.length)  {   

                            const userAddressLower = address.replace(/[\d,]/g, '').toLowerCase();

                            let latitude, longitude
                
                            for (const elem of results) {                          
                                            
                                let resultAddressLower = elem.address.freeformAddress.toLowerCase();

                                console.log(resultAddressLower)
                                // Controlla se l'indirizzo ottenuto contiene la stringa inserita dall'utente
                                if (resultAddressLower.indexOf(userAddressLower) !== -1) {
                                    latitude = elem.position.lat;
                                    longitude = elem.position.lng;                
                                    break; 
                                } 
                            }
                            
                            // if(latitude && longitude) {
                            //     this.getMap(longitude, latitude)
                            // }
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

                // if (this.apartment.address) {
                //     this.getTom(this.apartment.address)
                // }

                if (this.apartment.latitude && this.apartment.longitude) {
                    this.getMap(this.apartment.longitude, this.apartment.latitude)
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

                    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
                    confirmationModal.show();
                }
            }).finally(() => {
                // Imposta loading a false dopo aver ricevuto la risposta
                this.loading = false;
            });
            
        },
        getPrice(price) {
            // Converto il numero in stringa per poterlo manipolare
            const numString = price.toString();

            // Divido il numero in due parti, parte intera e parte decimale
            const [intPart, decimalPart] = numString.split('.');

            // Aggiungo un punto ogni tre cifre nella parte intera
            const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

            // Ricostruisco il numero con la parte decimale (se presente) e la parte intera formattata
            const formattedNumber = decimalPart !== undefined
                ? `${formattedIntPart}.${decimalPart}`
                : formattedIntPart;

            return formattedNumber;
        }
    }
}
</script>

<template>
    <div class="container mb-5">

        <div v-if="apartment" class="row">
            <div class="left col-12 col-md-12 col-lg-7 px-5">
    
                <!-- cover -->
                <div v-if="apartment.cover">
                    <img class="img-fluid w-100" v-if="apartment.cover.includes('apartment_cover_img')" :src="`${store.baseUrl}/storage/${apartment.cover}`"  alt="">
                    <img v-else class="img-fluid w-100" :src="apartment.cover" :alt="apartment.title">
                </div>                
              
                <!-- images -->
                <div class="d-flex thumbnail">
                    
                    <div v-for="( elem, index ) in apartment.images" :key="index" class="d-flex me-3 mt-3">  

                        <div class="box margine content">

                            <!-- wiggle -->
                            <a :href="`#${index}`" class="wiggle">
                                <img class="d-block" v-if="elem.url.includes('images')" :src="`${store.baseUrl}/storage/${elem.url}`" :alt="apartment.title">
                                <img v-else class="d-block" :src="elem.url" :alt="apartment.title">
                            </a>

                            <!-- lightbox -->
                            <div class="lightbox short-animate" :id="index">>
                                <img class="d-block rounded p-5 mt-5" v-if="elem.url.includes('images')" :src="`${store.baseUrl}/storage/${elem.url}`"  :alt="apartment.title">
                                <img v-else class="d-block rounded p-5 mt-5 " :src="elem.url" :alt="apartment.title">
                            </div>

                            <!-- lightbox controls -->
                            <div id="lightbox-controls" class="short-animate">
                                <a id="close-lightbox" class="long-animate" href="#">
                                    Close Lightbox
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- mappa -->
                <div id='map' class='map my-5 margine'>
                </div>
            </div>

            <!-- details -->
            <div class="right col-12 col-md-12 col-lg-5 px-4">

                <!-- title and address -->
                <ul class="p-0">
                    <li>
                        <h2 class="border-bottom mb-3 pb-3">{{ apartment.title }}</h2>
                    </li>
                    <li>
                        <h6 class="mt-2">
                            <i class="fa-solid fa-location-dot"></i>
                            {{ apartment.address }}
                        </h6>
                    </li>
                </ul>

                <!-- info appartamento -->
                <h4 class="mt-3 mb-2">Info Appartamento</h4>
                <ul class="p-0 d-flex flex-column row-gap-2">
                    <li>
                        <p>{{ apartment.description }}</p>
                    </li>
                    <li>
                        <strong>Stanze:</strong>
                        {{ apartment.rooms }}
                    </li>
                    <li>
                        <strong>Stanze letto: </strong>
                        {{ apartment.bedrooms }}
                    </li>
                    <li>
                        <strong>Bagni: </strong>
                        {{ apartment.bathrooms }}
                    </li>
                    <li>
                        <strong>Metri quadri: </strong>
                        {{ apartment.square_meters }}mq
                    </li>
                    <li v-if="apartment.price">
                        <strong>Prezzo: </strong>
                        {{ getPrice(apartment.price) }}&euro;
                    </li>
                </ul>

                <!-- servizi -->
                <div>
                    <h5 class="mt-3 mb-2"> Servizi della struttura</h5>
                    <div class="d-flex flex-wrap gap-2">

                        <span v-for="( elem, index ) in apartment.services" :key="index" class="p-1 mt-1 card d-inline"> 
                            <i :class="`fa-solid ${ elem.icon } me-1`"></i> {{  elem.name }} 
                        </span>
                    </div>
                </div>

                <!-- form contatta la truttura -->
                <form class="card p-4 mt-5 mb-4 margine" action="" @submit.prevent="sendForm()">
                    <h3 class="mb-2">Contatta la struttura</h3>

                    <!-- name -->
                    <div class="mb-3">
                        <label for="" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="name" placeholder="Nome" name="name" v-model="name">
                    </div>
    
                    <!-- email -->
                    <div class="mb-3">
                        <label for="" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email" v-model="email">
                    </div>
    
                    <!-- message -->
                    <div class="mb-3">
                        <div class="mb-3">
                            <label for="" class="form-label">Messaggio</label>
                            <textarea class="form-control" id="message" rows="3" name="message" v-model="message"></textarea>
                        </div>
                    </div>

                    <!-- apartment_id -->
                    <input type="hidden" name="apartment_id" v-model="apartment.id">
    
                    <!-- button -->
                    <button type="submit" class="btn" :disabled="loading">
                        <span v-if="!loading">Invia</span>
                        <span v-else>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span role="status">Caricamento...</span>
                        </span>
                    </button>

                    <!-- confirmation modal -->
                    <div class="modal mt-5" id="confirmationModal" tabindex="-1">
                        <div class="modal-dialog">
                            <div class="modal-content">

                                <!-- header -->
                                <div class="modal-header">
                                    <h5 class="modal-title">
                                        Messaggio inviato con successo!
                                    </h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <!-- footer -->
                                <div class="modal-footer">
                                    <button type="button" class="btn" data-bs-dismiss="modal">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    margin-top: 100px;

    .row {

        // left
        .left {

            // over
            .thumbnail {
                overflow-x: auto;

                // box
                .box {
    
                    // wiggle
                    .wiggle {
            
                        img {
                            width: 100px;
                            height: 100px;
                            box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
                            cursor: pointer;
                            border-radius: 10px;
                            object-fit: cover;
                
                            &:hover {
                                transform: translateY(-5px);
                                transition: transform 0.3s ease;
                            }
                        }
                    }

                    // lightbox
                    .lightbox {
                        position:fixed;
                        top:-100%;
                        bottom:100%;
                        left:0;
                        right:0;
                        background:rgba(0, 0, 0, 0.496);
                        z-index:501;
                        opacity:0;

                        img {
                            position:absolute;
                            margin:auto;
                            top:0;
                            left:0;
                            right:0;
                            bottom:0;
                            max-width:100%;
                            max-height:95%;
                            object-fit: contain;
                        }

                        &:target {
                            top:0%;
                            bottom:0%;
                            opacity:1;
                        }

                        &:target img {
                            max-width:100%;
                            max-height:95%;
                            box-shadow: none;
                            border-radius: 20px;
                        }

                        &:target ~ #lightbox-controls {
                            top:0px;
                        }

                        &:target ~ #lightbox-controls #close-lightbox:after {
                            width:50px;
                        }

                        &:target ~ #lightbox-controls #close-lightbox:before {
                            height:50px;
                        }
                    }
                    
                    // lightbox-controls
                    #lightbox-controls {
                        position:fixed;
                        height:70px;
                        width:70px;
                        top:-70px;
                        right:0;
                        z-index:502;
                        background:rgba(0,0,0,.1);
                    
                        #close-lightbox {
                            display:block;
                            position:absolute;
                            overflow:hidden;
                            height:50px;
                            width:50px;
                            text-indent:-5000px;
                            right:10px;
                            top:80px;
                            -webkit-transform:rotate(45deg);
                            -moz-transform:rotate(45deg);
                            -ms-transform:rotate(45deg);
                            -o-transform:rotate(45deg);
                            transform:rotate(45deg);
                            
                            &:before {
                                content:'';
                                display:block;
                                position:absolute;
                                height:0px;
                                width:3px;
                                left:24px;
                                top:0;
                                background:white;
                                border-radius:2px;
                                -webkit-transition: .5s .5s ease-in-out;
                                -moz-transition: .5s .5s ease-in-out;
                                -ms-transition: .5s .5s ease-in-out;
                                -o-transition:.5s .5s ease-in-out;
                                transition:.5s .5s ease-in-out;
                            }
                            
                            &:after {
                                content:'';
                                display:block;
                                position:absolute;
                                width:0px;
                                height:3px;
                                top:24px;
                                left:0;
                                background:white;
                                border-radius:2px;
                                -webkit-transition: .5s 1s ease-in-out;
                                -moz-transition: .5s 1s ease-in-out;
                                -ms-transition: .5s 1s ease-in-out;
                                -o-transition:.5s 1s ease-in-out;
                                transition:.5s 1s ease-in-out;
                            }
                        }
                    }
                }
            }

            // maps
            .map {
                aspect-ratio: 3/2;
                width: 100%;
                border-radius: 20px;
            }
        }

        // right
        .right {

            ul {
                list-style: none;
            }

            // form
            form {
                box-shadow: rgba(50, 50, 93, 0.20) 0px 10px 30px -20px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
            
                .btn {
                    background-color: #C6AB7C;
                    color: white;
                }
            }
        }
    }
}

.margine {
    margin-top: 40px;
}


.short-animate {
    -webkit-transition:.5s ease-in-out;
    -moz-transition:.5s ease-in-out;
    -ms-transition:.5s ease-in-out;
    -o-transition:.5s ease-in-out;
    transition:.5s ease-in-out;
}

.long-animate {
    -webkit-transition: .5s .5s ease-in-out;
    -moz-transition: .5s .5s ease-in-out;
    -ms-transition: .5s .5s ease-in-out;
    -o-transition:.5s .5s ease-in-out;
    transition:.5s .5s ease-in-out;
}

    @media (max-width: 1024px) { 
        .container {
            .row {
                .right {
                    ul {
                        li {
                            h2 {
                                font-size: 1.8rem;
                            }

                            h6 {
                                font-size: 0.9rem;
                            }
                        }
                    }

                    h4 {
                        font-size: 1.4rem;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) { 
        .container {
            .row {
                .right {
                    ul {
                        li {
                            h2 {
                                font-size: 1.4rem;
                            }

                            h6 {
                                font-size: 0.8rem;
                            }
                        }
                    }

                    h4 {
                        font-size: 1.2rem;
                    }
                }
            }
        }
    }
</style>