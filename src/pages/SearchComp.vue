<script>
import axios from 'axios';
import ttServices from "@tomtom-international/web-sdk-services";

    export default {
        name: "SearchComp",
        components: {


        },
        data() {
            return {
                apartments:[],
                baseUrl: 'http://127.0.0.1:8000',
                services: null,
                selectedServices: [],
                currentPage: 1,
                lastPage: 5,
                rooms: 0,
                bedrooms: 0,
                selectRooms: [1, 2, 3, 4, 5],
                address: '',
                longitude: 0,
                latitude: 0,
                distance: 20,
                isAddressOk: false
            }
        },
        mounted(){
            this.getApartment(1),
            this.getServices()
        },
        watch:{
            // selectedServices: {
            //     handler: 'getApartment',
            //     deep: true
            // }
        },
        methods: {
            getApartment(apartmentApiPage){

                const params = {
                    page: apartmentApiPage
                }

                if(this.address !== ''){
                    params.address = this.address,
                    params.longitude = this.longitude,
                    params.latitude = this.latitude
                }
                
                if(this.distance){
                    params.distance = this.distance
                }
                if ( this.rooms !== 0) {
                    params.rooms = this.rooms
                }
                
                if ( this.bedrooms !== 0) {
                    params.bedrooms = this.bedrooms
                }

                if(this.selectedServices.length > 0){
                    params.services_ids = this.selectedServices.join(',');
                }   

                axios.get(`${this.baseUrl}/api/apartments`, { params } ).then((res) =>{
                    console.log(res.data.apartment)
                    this.apartments = res.data.apartment.data
                    this.currentPage = res.data.apartment.current_page
                    this.lastPage = res.data.apartment.last_page
                })
            },
            getServices(){
                axios.get(`${this.baseUrl}/api/services`).then(res => {
                    this.services = res.data.services
                })
            },
            getTom(){
                // // tom tom
                ttServices.services.geocode({
                    batchMode: 'async',
                    key: "74CVsbN34KoIljJqOriAYN2ZMEYU1cwO",
                    query: this.address,
                    countrySet: 'IT',
                    language: 'it-IT',
                }).then( (response) => {
                        
                        const results = response.results;
                        console.log(results)
                        
                        // se abbiamo dei risultati ottenuti
                        if (results.length)  {   

                            for (const elem of results) {                          
                                
                                const userAddressLower = this.address.toLowerCase();
                                const resultAddressLower = elem.address.freeformAddress.toLowerCase();

                                // Controlla se l'indirizzo ottenuto contiene la stringa inserita dall'utente
                                if (resultAddressLower.includes(userAddressLower)) {
                                    this.isAddressOk = true;
                                    this.latitude = elem.position.lat;
                                    this.longitude = elem.position.lng;
                                    break; 
                                } else {
                                    console.error('Nessun risultato trovato per l\'indirizzo fornito.');
                                }

                            }
                            
                        }


                        // Verifica se ci sono risultati validi
                        if (this.isAddressOk) {
                            // Ottenimento delle coordinate di latitudine e longitudine
                            this.latitude = results[0].position.lat;
                            this.longitude = results[0].position.lng;

                        } else {
                            console.error('Nessun risultato trovato per l\'indirizzo fornito.');
                        }
                    }
                )
            }
        }
    }
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-10 col-lg-10 d-flex align-items-center">
                <!-- ricerca per longitudine -->
                <label  for="address" class="form-label fw-semibold me-2">Ricerca</label>
                <input id="address" v-model="address" type="text" class="w-100" placeholder="Inserisci la città o l'indirizzo" @keyup.enter="getApartment()"> <button @click="getTom()">Cerca</button>
            </div>
            <div class="col-12 col-md-2 col-lg-2">

                <!-- button offcanvas -->
                <button class="btn border py-1 px-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Filtri</button>

                <!-- offcanvas -->
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

                    <!-- header -->
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasRightLabel">Filtraggio</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <!-- body -->
                    <div class="offcanvas-body">
                        <div class="col-12">

                            <!-- Stanze totali -->
                            <div class="mb-3">
                                <label for="" class="form-label">Stanze</label>

                                <select v-model="rooms" class="form-select form-select-lg" name="" id="">
                                    <option value="0"> -- Tutte -- </option>

                                    <option v-for="(e, i) in selectRooms" :key="i" :value="e">{{ e }}{{ (e == 5 ? '+' : '') }}</option>
                                </select>
                            </div>

                            <!-- Stanze da Letto -->
                            <div class="mb-3">
                                <label for="" class="form-label">Stanze da Letto</label>

                                <select v-model="bedrooms" class="form-select form-select-lg" name="" id="">
                                    <option value="0"> -- Tutte -- </option>

                                    <option v-for="(e, i) in selectRooms" :key="i" :value="e">{{ e }}{{ (e == 5 ? '+' : '') }}</option>
                                </select>
                            </div>

                            <!-- Servizi -->
                            <div class="div row mb-3">
                                <label class="form-label">Servizi</label>
                                <label v-for="(e, i) in services" :key="i" class="col-4">
                                    <div>
                                        <input type="checkbox" :value="e.id" v-model="selectedServices">
                                        {{ e.name }}
                                    </div>
                                </label>
                            </div>

                            <!-- Distanza -->
                            <div class="div row mb-3">
                                <label for="distance" class="form-label">Distanza Km</label>
                                <input type="number" id="distance" v-model="distance" min="1">
                            </div>

                            <!-- button -->
                            <button @click="getApartment()">Filtra</button>
                        </div>
                    </div>
                </div>            
            </div>
        </div>

        <!-- apartments -->
        <div class="container">
            <div class="row">

                <router-link v-for="(elem, index) in apartments" :key='index' :to="{ name: 'SingleApartment', params:{ slug: elem.slug }}" class="col-12 col-md-6 col-lg-4">
                    <h3>{{ elem.title }}</h3>
                    <img class="img-fluid" :src="`${this.baseUrl}/storage/${elem.cover}`" :alt="elem.title">
                </router-link>

                <div class="col-12" v-if="apartments.length === 0">
                    <h2>Non ci sono Appartamenti</h2>
                </div>
            </div>
        </div>

        <!-- pagination -->
        <ul class="pagination my-2">
            <li class="page-item">
                <a class="page-link" @click.prevent="getApartment(currentPage - 1)" href="#" aria-label="Previous" :disabled="currentPage === 1">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="(elem, index) in lastPage" :key="index"
                :class="(currentPage === elem) ? 'active' : ''" >
                <a class="page-link" href="#" @click.prevent="getApartment(elem)">{{ elem }}</a>
            </li>
            <li class="page-item">
                <a class="page-link" @click.prevent="getApartment((currentPage + 1))" href="#" aria-label="Next" :disabled="currentPage === lastPage">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

</style>