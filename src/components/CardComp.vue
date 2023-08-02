<script>
import { store } from '../store';
import { useRoute } from 'vue-router';

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
    setup() {
        const route = useRoute();        
        // Verifica se la route corrente è la pagina Projects
        const isHomePage = route.path === '/';
        
        // se la pagina corrente sarà Projects, isProjectsPage = 'true', else 'false'
        return {
            isHomePage
        };
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
    }
}
</script>
<template>
   <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-if="propsCard.visibility">

        <router-link :to="{ name: 'SingleApartment', params:{ slug: propsCard.slug }}">

            <!-- card -->
            <div class="card">
               

                <!-- image -->
                <div class="zoom position-relative">
                    <img v-if="propsCard.cover.includes('apartment_cover_img')" :src="`${store.baseUrl}/storage/${propsCard.cover}`"  :alt="propsCard.title">
                    <img v-else :src="propsCard.cover" :alt="propsCard.title">

                    <!-- subscription mark -->
                    <div v-if="propsCard.subscriptions.length">
                        
                        <span class="position-absolute sub-mark" >
                            <i class="fa-solid fa-trophy me-1"></i>
                            SPONSORIZZATO
                        </span>
                    </div>
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
                        
                        <li class="list-group-item" v-if="propsCard.distance && !isHomePage">
                            <span>Distanza: {{ parseInt(propsCard.distance) }}Km</span>
                        </li>

                        <!-- vote -->
                        <li class="list-group-item d-flex justify-content-between align-items-center mb-2">
                            <div>
                                <i v-for=" elem in 5" class="text-warning fa-star" :class=" elem <= propsCard.vote ? `fa-solid` : `fa-regular` "></i>
                            </div>
                            <span class="fw-bold btn btn-vote">
                                {{ getVote(propsCard.vote) }}
                            </span>                            
                        </li>

                        <!-- price -->
                        <li class="list-group-item">
                            <span class="price">
                                {{ getPrice(propsCard.price) }}€/notte
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

        
        // image
        .zoom {
            overflow: hidden;
            width: 100%;
            height: 200px;
            
            // img
            img {
                height: 100%;
                min-width: 100%;
                display: block;
                transition: all 0.7s ease-in-out;
            }
            
            .sub-mark {
                z-index: 999;
                top: 0.7rem;
                left: 1.2rem;
                padding: 0.4rem 0.6rem;
                filter: brightness(1.05);
                border-radius: 5px;
                font-size: 0.8rem;
                font-weight: 800;
                background-color: #CBC8CC;
            }
            
            &:hover img {
                transform: scale(1.5);
                filter: brightness(0.8);
                transition: 2s;
            }
        }

        // card-body
        .card-body {
            ul {

                // address
                li.address-card {
                    min-height: 4rem;

                    h6 {
                        i {
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
                        padding: 0.1rem 0.8rem;
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
            transition: transform 0.3s ease;
        }

    }
}

</style>