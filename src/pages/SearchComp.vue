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
                distance: 20,
            }
        },
        mounted(){
            this.getApartment(),
            this.getServices()
        },
        watch:{
            selectedServices: {
                handler: 'getApartment',
                deep: true
            }
        },
        methods: {
            getApartment(apartmentApiPage){

                const params = {
                    page: apartmentApiPage
                }

                if(this.address){
                    params.address = this.address,
                    params.longitude = this.longitude,
                    params.latitude = this.latitude,
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

                axios.get(`${this.baseUrl}/api/apartments`, {params}).then((res) =>{
                    this.apartments = res.data.apartment.data
                    this.currentPage = res.data.apartment.current_page
                    this.lastPage = res.data.apartment.last_page
                })

                // // tom tom
                // ttServices.services.geocode({
                //     batchMode: 'async',
                //     key: "74CVsbN34KoIljJqOriAYN2ZMEYU1cwO",
                //     query: address,
                //     countrySet: 'IT',
                //     language: 'it-IT',
                // }).then(
                //     function (response) {
                        
                //         const results = response.results;
                //         console.log(results)
                        
                //     }
                // )
            },
            getServices(){
                axios.get(`${this.baseUrl}/api/services`).then(res => {
                    this.services = res.data.services
                })
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
                <input id="address" v-model="address" type="text" class="w-100" placeholder="Inserisci la città o l'indirizzo" @keyup.enter="getApartment()"> <button @click="getApartment()">Cerca</button>
            </div>
            <div class="col-12 col-md-2 col-lg-2">

                <button class="btn border py-1 px-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Filtri</button>

                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasRightLabel">Filtraggio</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <div class="col-12">
                            <!-- stanze totali -->
                            <div class="mb-3">
                                <label for="" class="form-label">Stanze</label>

                                <select @change="getApartment()" v-model="rooms" class="form-select form-select-lg" name="" id="">
                                    <option value="0"> -- Tutte -- </option>

                                    <option v-for="(e, i) in selectRooms" :key="i" :value="e">{{ e }}{{ (e == 5 ? '+' : '') }}</option>
                                </select>
                            </div>

                            <!-- letti -->
                            <div class="mb-3">
                                <label for="" class="form-label">Stanze da Letto</label>

                                <select @change="getApartment()" v-model="bedrooms" class="form-select form-select-lg" name="" id="">
                                    <option value="0"> -- Tutte -- </option>

                                    <option v-for="(e, i) in selectRooms" :key="i" :value="e">{{ e }}{{ (e == 5 ? '+' : '') }}</option>
                                </select>
                            </div>

                            <!-- servizi -->
                            <div class="div row mb-3">
                                <label for="" class="form-label">Servizi</label>
                                <label for="" v-for="(e, i) in services" :key="i" class="col-4">
                                    <div>
                                        <input type="checkbox" :value="e.id" v-model="selectedServices">
                                        {{ e.name }}
                                    </div>
                                </label>
                            </div>

                            <!-- distanza -->
                            <div class="div row mb-3">
                                <label for="distance" class="form-label">Distanza Km</label>
                                <input type="number" id="distance" v-model="distance" min="1" @keyup.enter="getApartment()">
                                <button @click="getApartment()">Cerca</button>
                            </div>
                        </div>
                    </div>
                </div>

            
            </div>
        </div>

        <!-- search -->
        <div class="row">
            <div class="col-12 mb-5">

                <!-- <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search"  @keyup.enter="search"> -->
                
                
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div v-for="(elem, index) in apartments" :key='index' class="col-12 col-md-6 col-lg-4">
                    <h3>{{ elem.title }}</h3>
                    <img class="img-fluid" :src="`${this.baseUrl}/storage/${elem.cover}`" :alt="title">
                </div>

                <div class="col-12" v-if="apartments.length === 0">
                    <h2>Non ci sono Appartamenti</h2>
                </div>
            </div>
        </div>
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