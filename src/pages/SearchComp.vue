<script>
import axios from 'axios';
import ttServices from "@tomtom-international/web-sdk-services";

    export default {
        name: "SearchComp",
        components: {

        },
        data() {
            return {
                address: '',
                apartments:[],
                baseUrl: 'http://127.0.0.1:8000',
                services: null,
                selectedServices: [],
                currentPage: 1,
                lastPage: 5,
                rooms: 0,
                bedrooms: 0,
                selectRooms: [1, 2, 3, 4, 5],
                longitude: 0,
                latitude: 0,
                distance: 20,
                tomTomResults: null
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
                if(this.address){
                    params.address = this.address
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
                    this.address = query.address;
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
                if (this.address) {
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
                if(this.address){
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
                    this.apartments = res.data.apartment.data
                    this.currentPage = res.data.apartment.current_page
                    this.lastPage = res.data.apartment.last_page
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
                        query: this.address,
                        countrySet: 'IT',
                        language: 'it-IT',
                    }).then( (response) => {
                            
                            const results = response.results;
                            // console.log(results)
                            
                            // se abbiamo dei risultati ottenuti
                            if (results.length)  {   

                                const userAddressLower = this.address.toLowerCase();
                    
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
    <div class="container mt-3">
        <div class="row mb-5">

            <!-- search -->
            <div class="col-12 col-md-10 col-lg-10 d-flex align-items-center">
                
                <input class="form-control me-2 w-75" id="search" name="search" type="search" placeholder="Inserisci la città o l'indirizzo" aria-label="Search" v-model="this.address"  list="datalistOptions" @keyup="autocomplete()" @keyup.enter="getApartment()">
                <datalist id="datalistOptions">                           
                </datalist>
                <button class="btn btn-outline-success" type="submit" @click="getApartment()">
                    Cerca
                </button>
            </div>

            <!-- filter -->
            <div class="col-12 col-md-2 col-lg-2">

                <!-- button offcanvas -->
                <button class="btn btn-primary border py-2 px-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Filtro avanzato</button>

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

                            <!-- Ricerca -->
                            <div class="mb-3">
                                <label class="form-label">Ricerca</label>
                                <input class="form-control" id="search" name="search" type="search" placeholder="Inserisci la città o l'indirizzo" aria-label="Search" v-model="this.address" list="datalistOptions" @keyup="autocomplete()" required>
                                <datalist id="datalistOptions">                           
                                </datalist>
                            </div>


                            <!-- Stanze totali -->
                            <div class="mb-3">
                                <label for="" class="form-label">Stanze</label>

                                <select v-model="rooms" class="form-select" name="" id="">
                                    <option value="0"> -- Tutte -- </option>

                                    <option v-for="(e, i) in selectRooms" :key="i" :value="e">{{ e }}{{ (e == 5 ? '+' : '') }}</option>
                                </select>
                            </div>

                            <!-- Stanze da Letto -->
                            <div class="mb-3">
                                <label for="" class="form-label">Stanze da Letto</label>

                                <select v-model="bedrooms" class="form-select" name="" id="">
                                    <option value="0"> -- Tutte -- </option>

                                    <option v-for="(e, i) in selectRooms" :key="i" :value="e">{{ e }}{{ (e == 5 ? '+' : '') }}</option>
                                </select>
                            </div>

                            <!-- Servizi -->
                            <div class="div row mb-3">
                                <label class="form-label">Servizi</label>
                                <div v-for="(e, i) in services" :key="i" class="col-5 form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" :value="e.id" v-model="selectedServices">
                                    <label class="form-check-label" for="inlineCheckbox1">
                                        {{ e.name }}
                                    </label>
                                </div>
                            </div>

                            <!-- Distanza -->
                            <div class="div row mb-3">
                                <label for="distance" class="form-label">Distanza Km</label>
                                <input type="number" id="distance" class="form-control" v-model="distance" min="1">
                            </div>

                            <!-- button -->
                            <button class="btn btn-primary" @click="getApartment()">Filtra</button>
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