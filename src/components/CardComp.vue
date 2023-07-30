<script>
import axios from 'axios';
import { store } from '../store';

    export default {
    name: "CardComp",
    props: ["propsCard"],
    data() {
        return {
            store,
            baseUrl: 'http://127.0.0.1:8000',
        };
    },
    mounted() {

    },
    methods: {
        getVote(vote) {

            if(vote === 3) {
                return "Buono"
            } else if(vote === 4) {
                return "Ottimo"
            } else {
                return "Eccellente"
            }
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
    },
    components: { 

    }
}
</script>
<template>
   <div class="col-12 col-md-4 col-lg-3" v-if="propsCard.visibility">

        <router-link :to="{ name: 'SingleApartment', params:{ slug: propsCard.slug }}">

            <div class="card" >

                <!-- image -->
                <div class="zoom">
                    <img v-if="propsCard.cover.includes('apartment_cover_img')" :src="`${store.baseUrl}/storage/${propsCard.cover}`"  :alt="propsCard.title">
                    <img v-else :src="propsCard.cover" :alt="propsCard.title">
                </div>

                <!-- list -->
                <div class="card-body pt-2">

                    <ul class="p-0 m-0">

                        <!-- address -->
                        <li class="list-group-item address-card">
                            <h6 class="d-flex gap-1">    
                                <i class="fa-solid fa-location-dot me-1"></i>
                                <span>
                                    {{ propsCard.address }}
                                </span>
                            </h6>
                        </li>

                        <!-- vote -->
                        <li class="list-group-item d-flex justify-content-between align-items-center mb-2">
                            <div>
                                <i v-for=" elem in 5" class="text-warning fa-star" :class=" elem <= propsCard.vote ? `fa-solid` : `fa-regular` "></i>
                            </div>
                            <span class="fw-bold btn btn-vote px-1 py-0">
                                {{ getVote(propsCard.vote) }}
                            </span>                            
                        </li>

                        <!-- price -->
                        <li class="list-group-item">
                            <span class="price">
                                {{ getPrice(propsCard.price) }} €
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </router-link> 
    </div>
                
</template>

<style lang="scss" scoped>
@import '../style/main.scss';

a {
    text-decoration: none;

    // card
    .card {
        margin-bottom: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 0 0 20px 20px;;


        // img
        img {
            height: 100%;
            min-width: 100%;
            display: block;
            transition: all 0.7s ease-in-out;
        }

        // image
        .zoom {
            overflow: hidden;
            width: 100%;
            height: 200px;

            &:hover img {
                transform: scale(1.5);
                filter: brightness(0.7);
                transition: transform 0.9s ease;
            }
        }

        // card-body
        .card-body {
            ul {

                // address
                li.address-card {
                    height: 3rem;

                    h6 {
                        i {
                            align-self: center;
                            font-size: 1.3rem;
                        }
                    }
                }
                
                li {

                    // vote
                    .btn-vote {
                        background-color: #C6AB7C;
                        font-size: 1.05rem;
                        color: #323232;
                    }

                    // price
                    .price {
                        font-weight: 600;
                        font-size: 1.1rem;
                    }
                }
            }
        }

        /* Stile aggiuntivo per rendere il layout più accattivante */
        &:hover {
        transform: translateY(-5px);
        transition: transform 0.3s ease;
        }

    }
}

</style>