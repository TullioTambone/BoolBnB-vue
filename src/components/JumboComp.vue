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

<!-- immagini per gli appartamenti -->

<!-- <img src="https://live.staticflickr.com/65535/53077744048_cc0f08f157_h.jpg" width="1600" height="1200" alt="reisetopia-T0H3DS-0BiA-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077244626_0892274a77_h.jpg" width="1600" height="1067" alt="grant-durr-owDt6QksGEg-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077743998_6a3cfcf049_h.jpg" width="1600" height="1067" alt="peter-borter-dWiwaNKAxWM-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077654645_8c6a0b999d_h.jpg" width="1600" height="1060" alt="shawnanggg-6UMPsbJraDA-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077244521_e93e5a3ec4_h.jpg" width="1600" height="1016" alt="pascal-bernardon-j2_ylRlzzGE-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077244441_33550b211a_h.jpg" width="1600" height="973" alt="abhishek-revis-wfvOMNMh5zE-unsplash"/>

<img src="https://live.staticflickr.com/65535/53076672012_d73dd283f7_h.jpg" width="1600" height="1060" alt="sonja-wilkinson--bKonMjSbvU-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077244376_fa72826bb7_h.jpg" width="1600" height="1077" alt="philip-hawkshaw-wkOlHhLYF_U-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077440469_a3e92050c6_h.jpg" width="1600" height="1190" alt="patrick-perkins-3wylDrjxH-E-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077743728_066e3bb2ee_h.jpg" width="1600" height="1067" alt="francesca-tosolini-tHkJAMcO3QE-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077244331_23e7cdfdaa_h.jpg" width="1600" height="1067" alt="deborah-cortelazzi-gREquCUXQLI-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077440439_dbaf91c172_h.jpg" width="1600" height="847" alt="huy-nguyen-AB-q9lwCVv8-unsplash"/>

<img src="https://live.staticflickr.com/65535/53076671902_a364c45b2d_h.jpg" width="1600" height="1063" alt="naomi-hebert-MP0bgaS_d1c-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077654330_2b0d2c8271_h.jpg" width="1600" height="1067" alt="nathan-van-egmond-9LMRQdVv7hw-unsplash"/>

<img src="https://live.staticflickr.com/65535/53076671877_306220e132_h.jpg" width="1600" height="1068" alt="nastuh-abootalebi-yWwob8kwOCk-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077743648_5a81c7f589_h.jpg" width="1600" height="1065" alt="huy-nguyen-9vvp_nuVaJk-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077440359_6de9f02863_h.jpg" width="1600" height="1067" alt="emily-wang-Wv65tpVIdDg-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077244191_d4def8b1de_h.jpg" width="1600" height="1067" alt="francesca-tosolini-XyGvEj587Mc-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077654280_f3fb8064f5_h.jpg" width="1600" height="853" alt="paul-szewczyk-bJGy8eodwg4-unsplash"/>

<img src="https://live.staticflickr.com/65535/53076671822_74de90c580_h.jpg" width="1600" height="1067" alt="med-badr-chemmaoui-xtDpXi_a-YQ-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077244171_16d5f438c8_h.jpg" width="1600" height="1067" alt="sidekix-media-JF5IuDNxN6M-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077654245_e057dfe96d_h.jpg" width="1600" height="1067" alt="grant-UhpYKnqZwE8-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077440269_8c27a7f103_h.jpg" width="1600" height="1067" alt="francesca-tosolini-21xbUDIN8ao-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077244156_04eb612968_h.jpg" width="1600" height="1067" alt="valentino-rodriguez-LXgo3g0nEYU-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077654185_f4ed6d2f9a_h.jpg" width="1600" height="1200" alt="eduardo-freire-1UH-uVzTiDU-unsplash"/>

<img src="https://live.staticflickr.com/65535/53076671727_fa4f259963_h.jpg" width="1600" height="1200" alt="kate-darmody-TDIdPmW2P9k-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077244101_fd6c36230e_h.jpg" width="1600" height="900" alt="dan-gold-4HG3Ca3EzWw-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077244026_600fa8181b_h.jpg" width="1600" height="1064" alt="huy-nguyen-G-4ZEoftr-0-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077243991_85d1607990_h.jpg" width="1600" height="1067" alt="point3d-commercial-imaging-ltd-0t5erEPTFuk-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077243941_b22ebd1cba_h.jpg" width="1600" height="1067" alt="viktor-bystrov-eHRzs3zunvQ-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077743398_57d98bc1e3_h.jpg" width="1600" height="1067" alt="francesca-tosolini-5o7ShX3cmmI-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077653955_d8e71e5b70_h.jpg" width="1600" height="1064" alt="andrea-davis-BMjiPShUKZo-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077243881_39756bc571_h.jpg" width="1600" height="983" alt="nguyen-thu-hoai-a15b7LYrfbk-unsplash"/>

<img src="https://live.staticflickr.com/65535/53076671477_9b4b63d58a_h.jpg" width="1600" height="1067" alt="ian-dooley-_-JR5TxKNSo-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077743323_c31752c805_h.jpg" width="1600" height="1200" alt="kate-darmody-mCoI5dCv7VQ-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077653785_f17a6c330f_h.jpg" width="1600" height="1067" alt="francesca-tosolini-Mx_W2atEaDo-unsplash"/>

<img src="https://live.staticflickr.com/65535/53076671367_119c498657_h.jpg" width="1600" height="1068" alt="vinicius-amnx-amano-ALpEkP29Eys-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077743268_78bdeeb929_h.jpg" width="1600" height="1067" alt="zac-gudakov--TiONiwniJs-unsplash"/>

<img src="https://live.staticflickr.com/65535/53076671337_5419472a87_h.jpg" width="1600" height="1067" alt="joseph-albanese-xx0oSB1YxRE-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077439849_30d3bb159c_h.jpg" width="1600" height="1067" alt="nathan-fertig-FBXuXp57eM0-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077243571_51415b92f8_h.jpg" width="1600" height="1064" alt="andrea-davis-Wj6oZNCAzs4-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077439764_4cc26c8082_h.jpg" width="1600" height="1067" alt="clay-elliot-1by_GbwEMwc-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077243476_9c249f84f0_h.jpg" width="1600" height="1071" alt="antonio-caverzan-D1YruV0KUDw-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077742893_6448b2d658_h.jpg" width="1600" height="1067" alt="kenny-eliason-kdwahpWYfQo-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077439674_e6959fc78f_h.jpg" width="1600" height="1068" alt="adam-winger-abzqM4wzlnI-unsplash"/>

<img src="https://live.staticflickr.com/65535/53076671077_2516c361dc_h.jpg" width="1600" height="1068" alt="adam-winger-JByeWNMdfoY-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077653470_005bda8b65_h.jpg" width="1600" height="1066" alt="josh-sorenson-JLCQT5eUAaw-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077243441_35aceaf2db_h.jpg" width="1600" height="1067" alt="point3d-commercial-imaging-ltd-irJRM_ZCQ6M-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077661665_ec47039805_h.jpg" width="1600" height="1067" alt="louis-hansel-w1w7sQ8md0I-unsplash"/>

<img src="https://live.staticflickr.com/65535/53077252871_67ee6005ca_h.jpg" width="1600" height="900" alt="ciudad-maderas-MXbM1NrRqtI-unsplash"/> -->
