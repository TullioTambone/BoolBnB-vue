<script>
import axios from 'axios';
import ttServices from "@tomtom-international/web-sdk-services";
import { store } from '../store';
import CardComp from '../components/CardComp.vue';

    export default {
        name: "SearchComp",
        components: {
            CardComp
        },
        data() {
            return {
                store,
                apartments:[],
                baseUrl: 'http://127.0.0.1:8000',
                services: null,
                selectedServices: [],
                currentPage: 1,
                lastPage: null,
                rooms: 0,
                bedrooms: 0,
                selectRooms: [1, 2, 3, 4, 5],
                longitude: 0,
                latitude: 0,
                distance: 20,
                tomTomResults: null,
            }
        },
        mounted(){
            // this.getApartment(1),
            this.getServices(),
            this.getFiltersFromURL()
        },
        watch:{
        },
        methods: {
            updateFiltersAndFetchData() {

                const params = {}

                // address
                if(this.distance !== 20){
                    params.distance = this.distance
                }

                // address
                if(store.address){
                    params.address = store.address
                }

                // rooms
                if ( this.rooms !== 0) {
                    params.rooms = this.rooms
                }

                // bedrooms
                if ( this.bedrooms !== 0) {
                    params.bedrooms = this.bedrooms
                }

                // services
                if(this.selectedServices.length > 0){
                    params.services_ids = this.getServiceNamesByIds(this.services, this.selectedServices).join(',');
                } 

                // Aggiorna l'URL senza ricaricare la pagina
                this.$router.replace({
                    path: this.$route.path,
                    query: params,
                });
            },
            async getFiltersFromURL() {
                const query = this.$route.query;

                if (query.address) {
                    store.address = query.address;
                }
                if (query.rooms) {
                    this.rooms = query.rooms;
                }
                if (query.bedrooms) {
                    this.bedrooms = query.bedrooms;
                }
                if (query.services_ids) {

                    const serviceNames = query.services_ids.split(',');  
                    await this.getServices();                  
                    this.selectedServices = this.getServiceIdsByNames(this.services, serviceNames);
                }

                // Chiamata ad getTom() se address è presente (per ottenere latitude e longitude)
                if (store.address) {
                    this.getTom().then(() => {
                    // Ripristina i valori dei filtri dopo aver ottenuto latitude e longitude
                        if (query.distance) {
                            this.distance = parseInt(query.distance);
                        }
                        this.getApartment();
                    });

                } else {
                    // Esegui la ricerca con i filtri applicati
                    this.getApartment(1);
                }
            },
            async getApartment(apartmentApiPage){

                const params = {
                    page: apartmentApiPage
                }
                
                // address
                if(store.address){
                    await this.getTom()
                    params.address = this.address
                    params.distance = this.distance
                    params.longitude = this.longitude
                    params.latitude = this.latitude
                    console.log(this.latitude, this.longitude)
                }
                
                // rooms
                if ( this.rooms !== 0) {
                    params.rooms = this.rooms
                }
                
                // bedrooms
                if ( this.bedrooms !== 0) {
                    params.bedrooms = this.bedrooms
                }

                // services
                if(this.selectedServices.length > 0){
                    params.services_ids = this.selectedServices.join(',');
                }   
                
                axios.get(`${this.baseUrl}/api/apartments`, { params } ).then((res) =>{
                    console.log(res.data.apartment)
                    // store.nonSponsoredApartments = res.data.apartment.data
                    store.nonSponsoredApartments = res.data.apartment.data.filter(apartment => apartment.subscriptions.length === 0);
                    this.currentPage = res.data.apartment.current_page
                    this.lastPage = res.data.apartment.last_page

                    store.sponsoredApartments = res.data.apartmentAll.filter(e => e.subscriptions.length !== 0).sort((a, b) => b.subscriptions[0].id - a.subscriptions[0].id);

                    this.updateFiltersAndFetchData()

                })
            },
            async getServices(){
                try {
                    const response = await axios.get(`${this.baseUrl}/api/services`)
                    this.services = response.data.services
                } catch (error) {
                    console.error(error);
                }

            },
            getServiceNamesByIds(services, selectedIds) {
                return selectedIds.map(id => {
                    const service = services.find(s => s.id === id);
                    return service ? service.name : '';
                });
            },
            getServiceIdsByNames(services, selectedNames) {
                return selectedNames.map((name) => {
                    const service = services.find((s) => s.name === name);
                    return service ? service.id : null;
                });
            },
            // tom tom
            async getTom(){

                try {
                    const response = await ttServices.services.geocode({
                        batchMode: 'async',
                        key: "74CVsbN34KoIljJqOriAYN2ZMEYU1cwO",
                        query: store.address,
                        countrySet: 'IT',
                        language: 'it-IT',
                    }).then( (response) => {
                            
                            const results = response.results;
                            // console.log(results)
                            
                            // se abbiamo dei risultati ottenuti
                            if (results.length)  {   

                                const userAddressLower = store.address.toLowerCase();
                    
                                for (const elem of results) {                          
                                                
                                    const resultAddressLower = elem.address.freeformAddress.toLowerCase();
                    
                                    // Controlla se l'indirizzo ottenuto contiene la stringa inserita dall'utente
                                    if (resultAddressLower.includes(userAddressLower)) {
                                        this.latitude = elem.position.lat;
                                        this.longitude = elem.position.lng;
                                        console.log(this.latitude, this.longitude)
                    
                                        break; 
                                    } 
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
            autocomplete() {    
                // Ottenimento dell'indirizzo dal campo input
                const search = document.querySelector('#search');
            
                if( search.value ) {

                    ttServices.services.geocode({
                        batchMode: 'async',
                        key: "74CVsbN34KoIljJqOriAYN2ZMEYU1cwO",
                        query: search.value,
                        countrySet: 'IT',
                        language: 'it-IT',
                    }).then(
                        function (response) {
                            
                            const results = response.results;
                            // console.log(results)                
            
                            // se abbiamo dei risultati ottenuti
                            if (results.length)  {   
            
                                for (const elem of results) {
                                    document.getElementById('datalistOptions').innerHTML += `
                                    <option value="${elem.address.freeformAddress}">${elem.address.freeformAddress}</option>
                                    `;
                                }
                            }
                            
                        }
                    ).catch((error) => {
                        console.error('Si è verificato un errore nella richiesta al servizio di geocodifica di TomTom:', error);
                    });
                }
            }
        }
    }
</script>
<template>
    <div class="container mt-5">
        <div class="row mb-5 pt-5 mt-5 align-items-center row-gap-2">
            
            <!-- search -->
            <div class="col-xl-9 col-lg-9 col-md-7 col-12">
                <input class="form-control" id="search" name="search" type="search"  placeholder="  Inserisci la città o l'indirizzo" aria-label="Search" v-model="store.address"  list="datalistOptions" @keyup="autocomplete()" @keyup.enter="getApartment()">
                <datalist id="datalistOptions">                           
                </datalist>
            </div>

            <!-- submit -->
            <div class="col-xl-1 col-lg-1 col-md-2 col-6 d-flex justify-content-center px-0 sub-button">
                <button id="submit" class="btn w-100" type="submit" @click="getApartment()">
                    Cerca
                </button>
            </div>

            <!-- button offcanvas -->
            <div class="col-xl-2 col-lg-2 col-md-3 col d-flex justify-content-center">
                <button id="filter" class="btn border py-2 w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Filtro avanzato</button>
            </div>
    
            <!-- offcanvas -->
            <div class="px-3 offcanvas offcanvas-end forms" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

                <!-- header -->
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">
                        <strong>Filtraggio</strong>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <!-- body -->
                <div class="offcanvas-body">
                    <div class="col-12">
                        <div class="d-flex justify-content-center w-75 ms-5 mb-3">
                            <img class="logo-img object-fit-cover" src="/img/Boolbnb-logo-transparente.png" alt="Boolbnb logo">
                        </div>
                        <!-- Ricerca -->
                        <div class="mb-3">
                            <label class="form-label"> <strong>Ricerca  <i class="fa-solid fa-magnifying-glass"></i> </strong></label>
                            <input class="form-control" id="search" name="search" type="search" placeholder="Inserisci la città o l'indirizzo" aria-label="Search" v-model="store.address" list="datalistOptions" @keyup="autocomplete()" required>
                            <datalist id="datalistOptions">                           
                            </datalist>
                        </div>


                        <!-- Stanze totali -->
                        <div class="mb-3">
                            <label for="" class="form-label"> <strong>Stanze  <i class="fa-solid fa-door-open"></i> </strong></label>

                            <select v-model="rooms" class="form-select" name="" id="">
                                <option value="0"> -- Tutte -- </option>

                                <option v-for="(e, i) in selectRooms" :key="i" :value="e">
                                    {{ e }}{{ (e == 5 ? '+' : '') }}
                                </option>
                            </select>
                        </div>

                        <!-- Stanze da Letto -->
                        <div class="mb-3">
                            <label for="" class="form-label"> <strong>Stanze da Letto <i class="fa-solid fa-bed"></i>  </strong></label>

                            <select v-model="bedrooms" class="form-select" name="" id="">
                                <option value="0"> -- Tutte -- </option>

                                <option v-for="(e, i) in selectRooms" :key="i" :value="e">
                                    {{ e }}{{ (e == 5 ? '+' : '') }}
                                </option>
                            </select>
                        </div>

                        <!-- Servizi -->
                        <div class="div row mb-3">
                            <label class="form-label"> <strong>Servizi</strong></label>
                            <div v-for="(e, i) in services" :key="i" class="col-5 form-check form-check-inline py-1 pt-1">
                                <input class="form-check-input" type="checkbox" :value="e.id" v-model="selectedServices">
                                <label class="form-check-label" for="inlineCheckbox1">
                                    {{ e.name }}
                                </label>
                            </div>
                        </div>

                        <!-- Distanza -->
                        <div class="div row mb-3">
                            <label for="distance" class="form-label">
                                <strong>Distanza Km</strong>
                            </label>
                            <input type="number" id="distance" class="form-control" v-model="distance" min="1">
                        </div>

                        <!-- button -->
                        <button class="btn border" @click="getApartment()">Filtra</button>
                    </div>
                </div>
            </div>            
        </div>

        <!-- apartments -->
        <div class="container my-5">

            <!-- sponsored -->
            <div v-if="store.sponsoredApartments.lenght !== 0" class="row my-5 border-bottom border-top">
                <span class="text-end text-secondary mb-2">sponsorizzati</span>
                <CardComp  
                    v-for="(elem, index) in store.sponsoredApartments.slice(0, 4)" :key='index'
                    :propsCard="elem"
                />
            </div>

            <!-- no sponsored -->
            <div class="row">
                <CardComp  
                    v-for="(elem, index) in store.nonSponsoredApartments" :key='index'
                    :propsCard="elem"
                />
            </div>
        </div>
        <!-- pagination -->
        <ul class="pagination my-2">
            <li class="page-item">
                <a class="page-link" @click.prevent="getApartment(currentPage - 1)" href="#" aria-label="Previous" :disabled="currentPage === 1">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item d-none d-md-block" v-for="(elem, index) in lastPage" :key="index"
                :class="(currentPage === elem) ? 'active' : '' " >
                <a class="page-link" href="#" @click.prevent="getApartment(elem)">
                    {{ elem }}
                </a>
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
@import '../style/main.scss';

    .container {
        .row {
            #submit {
                border: 3px solid #C6AB7C;

                &:hover {
                    background-color: #C6AB7C;
                    color: #ffffff;
                }
            }

            #filter {
                background-color: #C6AB7C;
                color: #ffffff;

                &:hover {
                    filter: brightness(1.1);
                }
            }
        }
        img {
            border-radius: 20px;
            width: 300px;
            height: 150px;
        }
        a {
            text-decoration: none;
            color: black;
            
            h3 {
                font-size: 20px;
            }
        }

    }

    .forms{
        background: rgb(198,171,124);
        background: linear-gradient(0deg, rgba(198,171,124,1) 0%, rgba(206,183,142,1) 2%, rgba(221,205,176,1) 10%, rgba(235,225,207,1) 31%, rgba(255,255,255,1) 100%);
        z-index: 99999999999;
    }

    .active > .page-link{
        background-color: #C6AB7C;
        border-color: #C6AB7C;
    }

    .page-link {

        &:focus {
            box-shadow: none;
        }

        &:hover {
            color: #ffffff;
            background-color: #c6ab7cc4;
        }
    }

    @media (max-width: 768px) {

        .container {
            .row {
                .sub-button {
                    padding-left: 1rem !important;
                }
            }
        }
    }
</style>