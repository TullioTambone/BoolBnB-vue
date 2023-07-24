<script>
import axios from 'axios';
import { myStore } from '../store.js';

    export default {
        name:'HomeComp',
        data() {
            return {
                myStore: myStore(),
                apartments:[],
                baseUrl: 'http://127.0.0.1:8000'
            }
        },
        mounted(){
            this.getApartment()
        },
        methods: {
            getApartment(){
                axios.get(`${this.baseUrl}/api/apartments`).then((res) =>{
                    this.apartments = res.data.apartment.data
                    console.log(res)
                })
            }
        }

    }
</script>
<template>
    <h1>home page</h1>
    <div v-if="apartments" class="container">
        <div class="row">

            <!-- search -->
            <div class="col-12 col-md-12 col-lg-12 d-flex align-items-center">
                
                <input class="form-control me-2 w-75" id="search" name="search" type="search" placeholder="Inserisci la città o l'indirizzo" aria-label="Search" v-model="myStore.address" @keyup="myStore.autocomplete" list="datalistOptions">
                <datalist id="datalistOptions">                           
                </datalist>
                <router-link class="btn btn-outline-success" to="/search">
                    Cerca
                </router-link>
            </div>

            <div v-for="(elem, index) in apartments" :key='index' class="col-12 col-md-6 col-lg-4">
                <h3>{{ elem.title }}</h3>
                <img class="img-fluid" :src="`${this.baseUrl}/storage/${elem.cover}`" :alt="elem.title">
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>