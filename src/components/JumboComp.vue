<script>
import { store } from '../store.js'

export default {
    name: 'JumboComp',
    props: ["propsApartments"],
    components: {
    },
    data() {
            return {
                store
            };
        },
}
</script>

<template>
    <div class="container-fluid position-relative p-0">
        
        <div class="position-absolute container-abs z-1">
            <div class="card d-flex align-items-center justify-content-center">
                <div class="p-1 box-card">
                    <h4 class="mb-5">Cerca il tuo primo appartamento</h4>
                    <input class="form-control w-100" id="search" name="search" type="search" placeholder="Inserisci la città o l'indirizzo" aria-label="Search" v-model="store.address" @keyup="autocomplete()" list="datalistOptions">
                    <datalist id="datalistOptions">                           
                    </datalist>
                    <router-link class="btn btn-primary mt-4 w-100" to="/search">
                        Cerca
                    </router-link>
                </div>
            </div>
        </div>

        <div class="contenitore d-flex position-relative">
            <div class="item position-absolute" v-for="(element, index) in propsApartments" :key="index">
                <img :src="element.cover"  :alt="element.title"> 
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>

    
    .container-fluid {
        height: 90vh;
        
        .container-abs {
            top: 50%;
            left: 10%;
            transform: translate(0, -50%);
            width: 20rem;

            .card {
                height: 250px;
                border-radius: 30px;
                margin: 0 auto;
                width: 25rem;
            }
        }
        .contenitore {
            width: 100%;
            height: 100%;
            padding-bottom: 1rem;
            overflow: hidden;

            .item {
                width: 100vw;
                top: 0;
                left: 0;
                right: 0;

                img {
                    width: 100%;
                }        
            }
        }
    }
    @media (max-width: 768px) {
        .container {
            justify-content: flex-start;
            align-items: flex-start;
            margin-left: 0;

            .container-abs {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                order: 1;
                margin-bottom: 1rem;
            }
            .card {
                width: 20rem !important;
                display: flex;
            }
            .contenitore {
                width: 100%;
            }
            .box-card {
                margin: 0 15px;

            }
        }
    }

</style>