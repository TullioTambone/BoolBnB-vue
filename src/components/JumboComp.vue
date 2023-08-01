<script>
import { store } from '../store.js'

export default {
    name: 'JumboComp',
    props: {
        image: String,
        title: String
    },
    components: {
    },
    data() {
        return {
            store
        };
    },
    mounted() {
    },
    methods: {
        
    }
}
</script>

<template>
    <div class="container-fluid position-relative p-0">
        
        <!-- search -->
        <div class="position-absolute container-abs">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="text-jumbo col-12 text-center text-white">
                        <h2>La Felicità è a Portata di Chiavi</h2>
                        <h5>Trova la Casa dei Tuoi Sogni</h5>
                    </div>
                </div>
                <div class="row flex-nowrap justify-content-center mt-3">
                    <div class="input-search position-relative">
                        <input autocomplete="off" class="form-control" id="search" name="search" type="search" placeholder="Cerca il tuo primo appartamento" aria-label="Ricerca appartamento" v-model="store.address" @keyup="$emit('autocomplete')" list="datalistOptions">
                        <datalist id="datalistOptions" class="position-absolute">                
                        </datalist>
                    </div>
                    <div class="button-search">
                        <router-link class="col-2 btn w-100" to="/search">
                            <span>
                                Cerca
                            </span>
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- slides-->
        <div class="contenitore d-flex position-relative">
            <div class="item position-absolute">
                <div class="b-black position-absolute"></div>

                <img 
                    v-if="image.includes('apartment_cover_img')" 
                    :src="`${store.baseUrl}/storage/${image}`" 
                    :alt="title"
                >
                <img 
                    v-else :src="image" :alt="title"
                >
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import '../style/main.scss';
    
    .container-fluid {
        height: 100vh;
        
        .container-abs {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -60%);
            z-index: 999;

            .container {
                .row {
                    .input-search {
                        width: 400px;

                        #datalistOptions {                            
                            background-color: #ffffff;
                            border: 1px solid #C6AB7C;
                            border-radius: 0 0 5px 5px;
                            border-top: none;
                            padding: 2px;
                            top: 100%;
                            width: 100%; 
                        }
                    }

                    .button-search {
                        width: 100px;

                        a {
                            background-color: #C6AB7C;
                            color: #ffffff;
                            
                            .fa-magnifying-glass {
                                display: none;
                            }
                            
                            &:hover {
                                filter: brightness(1.1);
                            }
                        }
                    }

                    .text-jumbo {
                        font-family: 'Gilda Display', serif;
                        width: 1000px;

                        h2 {
                            font-size: 4rem !important;
                        }
                    }
                }
            }
        }
        .contenitore {
            width: 100%;
            height: 100%;
            margin-bottom: 1rem;
            overflow: hidden;

            .item {
                width: 100vw;
                height: 100%;
                top: 0;
                left: 0;
                right: 0;

                .b-black {
                    width: 100%;
                    height: 100vh;
                    background-color: #00000045;
                }

                img {
                    object-position: 0 -50px;
                    object-fit: cover;
                }        
            }
        }
    }

    // tablet
    @media (max-width: 768px) {
        .container-fluid {

            .container-abs {

                .container {
                    .row {
                        .text-jumbo {
                            width: 600px;
                        }

                        .input-search {
                            width: 300px;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 600px) {
        .container-fluid {

            .container-abs {

                .container {
                    .row {
                        .text-jumbo {
                            width: 400px;
                            h2 {
                                font-size: 3.8rem !important;
                            }
                        }
                        
                        .input-search {
                            padding: 0;

                            input#search {
                                border-radius: 10px 0 0 10px !important;
                            }
                        }

                        .button-search {
                            padding: 0;
                            width: 50px;

                            a {
                                border-radius: 0 10px 10px 0;
                                height: 2.35rem;
                                width: 3rem !important;

                                .fa-magnifying-glass {
                                    display: block;
                                    line-height: 1.7rem;
                                }

                                span {
                                    display: none;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // mobile
    @media (max-width: 425px) {
        .container-fluid {

            .container-abs {

                .container {
                    .row {
                        .text-jumbo {
                            width: 350px;

                            h2 {
                                font-size: 3.6rem !important;
                            }
                        }

                        .input-search {
                            width: 250px;
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 375px) { 
        .container-fluid {
            .container-abs {
                .container {
                    .row {
                        .text-jumbo {
                            width: 300px;

                            h2 {
                                font-size: 3.4rem !important;
                            }
                        }

                        .input-search {
                            max-width: 220px;
                        }
                    }
                }
            }
        }
    }

</style>