<script>
import axios from 'axios';
import { store } from '../store';

    export default {
    name: "CardComp",
    props: ["propsCard"],
    data() {
        return {
            store
        };
    },
    mounted() {
        
    },
    methods: {
 
    },
    components: { 

    }
}
</script>
<template>
   
   <div class="col-12 col-md-4 col-lg-3" v-if="propsCard.visibility">
        <div class="card p-1" >

            <!-- image -->
            <div class="zoom">
                <img v-if="propsCard.cover.includes('apartment_cover_img')" :src="`${store.baseUrl}/storage/${propsCard.cover}`"  :alt="propsCard.title">
                <img v-else :src="propsCard.cover" :alt="propsCard.title">
            </div>

            <!-- list -->
            <div class="card-body pt-2">

                <ul class="p-0">

                    <!-- address -->
                    <li class="list-group-item address-card">
                        <h6 class="d-flex gap-1">    
                            <i class="fa-solid fa-location-dot me-1"></i>
                            <span>
                                {{ propsCard.address }}
                            </span>
                        </h6>
                    </li>

                    <!-- bedrooms -->
                    <li class="list-group-item">
                        <strong>Stanze da letto:</strong>
                        {{ propsCard.bedrooms }}
                    </li>

                    <!-- bathrooms -->
                    <li class="list-group-item">
                        <strong>Bagni:</strong>
                        {{ propsCard.bathrooms }}
                    </li>

                    <!-- price -->
                    <li class="list-group-item">
                        <strong>Prezzo:</strong>
                        {{ propsCard.price }} €
                    </li>
                </ul>
            </div>
        </div>
    </div>
                
</template>

<style lang="scss" scoped>
@import '../style/main.scss';

.card {
    flex: 0 0 calc(33.33% - 10px); /* Dividere il contenitore in tre colonne con uno spazio di 10px tra le card */
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 20px;

    img {
        width: 100%;
        display: block;
        transition: all 0.7s ease-in-out;
    }

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

    .card-body {
        ul {
            li.address-card {
                height: 3.8rem;

                h6 {
                    i {
                        align-self: center;
                        font-size: 1.3rem;
                    }
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

</style>