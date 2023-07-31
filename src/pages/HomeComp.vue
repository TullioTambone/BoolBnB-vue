<script>
import axios from 'axios';
import ttServices from "@tomtom-international/web-sdk-services";
import { store } from '../store';

import JumboComp from '../components/JumboComp.vue';
import CardComp from '../components/CardComp.vue';
import TeamComp from '../components/TeamComp.vue';
    export default {
    name: "HomeComp",
    components: {
    JumboComp,
    CardComp,
    TeamComp
},
    data() {
        return {
            store,
            apartments: [],
            baseUrl: "http://127.0.0.1:8000"
        };
    },
    mounted() {
        this.getApartment();
        this.autoScroll();
    },
    methods: {
        getApartment() {
            axios.get(`${this.baseUrl}/api/apartments`).then((res) => {
                // this.apartments = res.data.apartment.data;
                this.apartments = res.data.apartment.data
                console.log(res.data)
                store.sponsoredApartments = res.data.apartment.data.filter(e => e.subscriptions.length !== 0).sort((a, b) => b.subscriptions[0].id - a.subscriptions[0].id);
                store.nonSponsoredApartments = res.data.apartment.data.filter(e => e.subscriptions.length === 0);
                console.log(store.sponsoredApartments, store.nonSponsoredApartments);
            });
        },
        autocomplete() {
            // Ottenimento dell'indirizzo dal campo input
            const search = document.querySelector("#search");
            if (search.value) {
                ttServices.services.geocode({
                    batchMode: "async",
                    key: "74CVsbN34KoIljJqOriAYN2ZMEYU1cwO",
                    query: search.value,
                    countrySet: "IT",
                    language: "it-IT",
                }).then(function (response) {
                    const results = response.results;
                    console.log(results);
                    // se abbiamo dei risultati ottenuti
                    const datalist = document.getElementById("datalistOptions");

                    if (results.length) {
                        for (const elem of results) {
                            datalist.innerHTML += `<option value="${elem.address.freeformAddress}">${elem.address.freeformAddress}</option>`;
                        }
                    }
                });
            }
        },
        autoScroll() {
            
            this.autoscroll = setInterval( () => {
                store.activeSlide++;
    
                if ( store.activeSlide === this.apartments.length ) {
    
                    store.activeSlide = 0;
                }
            }, 4000 );
        }
    }
}
</script>
<template>
   
    <!-- jumbo -->
    <JumboComp 
    v-if="apartments.length"
        :image="apartments[store.activeSlide].cover"
        :title="apartments[store.activeSlide].title"
        @autocomplete="autocomplete"
    />
    <!-- apartments -->
    <div class="container my-5">
        <div class="row my-5 border-bottom border-top round">
            <span class="text-end text-secondary mb-2">sponsorizzati</span>
            <CardComp  
                v-for="(elem, index) in store.sponsoredApartments" :key='index'
                :propsCard="elem"
            />
        </div>
        <div class="row">
            <CardComp  
                v-for="(elem, index) in store.nonSponsoredApartments" :key='index'
                :propsCard="elem"
            />
        </div>
    </div>
   <section class="container-fluid border-top">
        
        <!-- {{-- dashboard --}} -->
        <div id="dashboard">
            <div class="container pt-5">
                <div class="row">

                    <!-- {{-- description --}} -->
                    <div class="box-description col-12 col-md-8 col-lg-6 d-flex justify-content-center align-items-center">
                        <div class="d-flex flex-column">
                            <div class="info d-flex justify-content-center align-items-center">
                                <div class="w-75">
                                    <h2>Trova la Casa dei Tuoi Sogni</h2>
                                    <p>
                                        Naviga tra i nostri appartamenti disponibili in destinazioni mozzafiato in tutto il mondo. Dalle rilassanti spiagge tropicali ai pittoreschi rifugi di montagna, troverai sicuramente la casa perfetta per il tuo prossimo soggiorno indimenticabile.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- {{-- img --}} -->
                    <div class="box-img col-12 col-md-4 col-lg-6 d-flex justify-content-center align-items-center">
                        <img src="/img/Boolbnb-logo.png" alt="">
                    </div>
                </div>

                <!-- {{-- benvenuto --}} -->
                <div class="row mb-5">
                    <div class="box-img col-12 col-md-4 col-lg-6 d-flex justify-content-center align-items-center">
                        <img src="/img/Boolbnb-logo.png" alt="logo boolb&b">
                    </div>
                    <div class="box-description col-12 col-md-8 col-lg-6 d-flex justify-content-center align-items-center">
                        <div class="d-flex flex-column">
                            <h2>
                                Scopri BoolB&B è facile e intuitivo!
                            </h2>
                            <ul class="p-0">
                                <li>
                                    <div class="d-flex align-items-center single-cont">
                                        <img src="/img/support.png" alt="">
                                        <div class="info d-flex flex-column justify-content-center">
                                            <h4>Supporto clienti pronto ad aiutarti</h4>
                                            <p>Il nostro team di supporto è disponibile 24/7 per assisterti in ogni tua
                                                esigenza.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex align-items-center single-cont">
                                        <img src="/img/contact.png" alt="">
                                        <div class="info d-flex flex-column justify-content-center">
                                            <h4>Contatta l'Host</h4>
                                            <p>Una volta trovata la casa che cattura il tuo cuore, non esitare a contattare
                                                l'host.</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex align-items-center single-cont">
                                        <img src="/img/custom.png" alt="">
                                        <div class="info d-flex flex-column justify-content-center">
                                            <h4>Personalizza la tua esperienza</h4>
                                            <p>L'host sarà lieto di aiutarti a personalizzare la tua ricerca secondo le tue
                                                preferenze. Siamo qui per aiutarti a trovare la casa fatta su misura per te.</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div class="row mb-5">
                    <div class="box-description col-12 d-flex justify-content-center align-items-center">
                        <div class="d-flex flex-column w-75 text-center">
                            <h2 class="text-center">Scopri i Piani di Abbonamento: Metti in Evidenza la Tua Casa Vacanza!</h2>
                            <p>"Rendi il tuo appartamento un vero protagonista con i nostri esclusivi piani di abbonamento!
                                Aumenta la visibilità del tuo annuncio, posizionandolo in cima alle ricerche degli ospiti.
                                Scopri le opzioni su misura per te e attira più futuri acquirenti. Esplora i piani disponibili e raggiungi un pubblico più ampio oggi
                                stesso!"</p>
                        </div>
                    </div>

                    <div class="card-sub d-flex justify-content-center flex-wrap">
                        <div class="card card__one col-12 col-md-4">
                            <div class="card__text">
                                <h3>€2.99</h3>
                                <span>24h</span>
                                <span><strong>BASE</strong></span>
                                <hr>
                                <p class="card__title"></p>
                                <div>
                                    <ul class="features">
                                        <li>
                                            <span class="icon">
                                                <i class="fa-solid fa-check"></i>
                                            </span>
                                            <span><strong>1</strong> giorno di visibilità</span>
                                        </li>
                                        <li>
                                            <span class="icon">
                                                <i class="fa-solid fa-check"></i>
                                            </span>
                                            <span><strong>Badge</strong> "Base"</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card card__two col-12 col-md-4">
                            <div class="card__text">
                                <h3>€5.99</h3>
                                <span>48h</span>
                                <span><strong>PREMIUM</strong></span>
                                <hr>
                                <p class="card__title"></p>
                                <div>
                                    <ul class="features">
                                        <li>
                                            <span class="icon">
                                                <i class="fa-solid fa-check"></i>
                                            </span>
                                            <span><strong>2</strong> giorni di visibilità</span>
                                        </li>
                                        <li>
                                            <span class="icon">
                                                <i class="fa-solid fa-check"></i>
                                            </span>
                                            <span>Base <strong>x2</strong></span>
                                        </li>
                                        <li>
                                            <span class="icon">
                                                <i class="fa-solid fa-check"></i>
                                            </span>
                                            <span><strong>Badge</strong> "Premium"</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card card__three col-12 col-md-4">
                            <div class="card__text">
                                <h3>€9.99</h3>
                                <span>144h</span>
                                
                                <span><strong>PLATINO</strong></span>
                                <hr>
                                <p class="card__title"></p>
                                <div>
                                    <ul class="features">
                                        <li>
                                            <span class="icon">
                                                <i class="fa-solid fa-check"></i>
                                            </span>
                                            <span><strong>6</strong> giorni di visibilità</span>
                                        </li>
                                        <li>
                                            <span class="icon">
                                                <i class="fa-solid fa-check"></i>
                                            </span>
                                            <span>Premium <strong>x3</strong></span>
                                        </li>
                                        <li>
                                            <span class="icon">
                                                <i class="fa-solid fa-check"></i>
                                            </span>
                                            <span><strong>Badge</strong> "Platino"</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </section>
   <section class="py-5 border-top">
        <div class="py-2 mt-5">
            <TeamComp/>
        </div>

   </section>
</template>

<style lang="scss" scoped>
@import '../style/main.scss';


#dashboard{
    .container{
        .row{
            margin-bottom: 100px;
            .card-sub{
                margin-top: 50px;
                .card {
                    border-radius: 15px;
                    box-shadow: 5px 5px 20px -5px rgba(0,0,0,0.6);
                    height: 300px;
                    overflow: hidden;
                    width: 250px;
                    text-align: center;
                    margin: 0 30px;
                     &:hover {
                       box-shadow: 5px 5px 20px -7px rgba(0,0,0,0.5);
                     }
                     .card__text{
                        margin: auto;
                        h3{
                            
                            font-size: 40px;
                        }
                        span{
                            display: block;
                        }
                        hr{
                            margin: 10px auto;
                            width: 25%;
                            border: 2px solid blue;
                        }
                        .features {
                            display: flex;
                            flex-direction: column;
                            li {
                                display: flex;
                                align-items: center;
                                gap: .5rem;
                            }
                            
                            .icon {
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                width: 20px;
                                height: 20px;
                                svg {
                                    width: 14px;
                                    height: 14px;
                                }
                            }
                            
                            & + * {
                                margin-top: 1.25rem;
                            }
                        }
                     }
                  }

            }

            .box-img{
                img{
                    width: 300px;
                }
                // border: 1px solid black;
            }
            .box-description{
                h2{
                    margin: 50px 0;
                    font-weight: 600;
                }
                ul{
                    li{
                        margin-bottom: 20px;
                        list-style: none;
                        img{
                            width: 60px;
                        }
                        .info{
                            margin-left: 20px;
                            h4{
                                padding-top: 15px;
                            }
                            p{
        
                            }
                        }
                    }
                }
            }
        }
    }
}





@media (max-width: 425px) {
    #dashboard{
        .container{
            .row{
                .card-sub{
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    order: 3;
                    .card{
                        margin-bottom: 30px;
                    }
                }
                .box-img{
                   order: 1;
                    
                }
                .box-description{
                    order: 2;
                    ul{
                        padding-left: 0;
                        li{
                            .single-cont{
                                text-align: center;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                .info{
                                    margin: 0 auto;
                                    h4{
                                        padding-top: 15px;
                                    }
                                    p{
                
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@media (max-width: 1024px) {
   
}
</style>