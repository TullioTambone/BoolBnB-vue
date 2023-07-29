<script>
import { store } from '../store.js'


export default {
  name: 'FooterComp',
  props: [],
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
 <div class="contenitore">
    <div class="contenitore2 d-flex justify-content-between ">
        <div class="p-3">
            <img class="logo-img" src="/img/Boolbnb-logo-transparente-total-white.png" alt="Boolbnb logo">
        </div>
        <div class="d-flex p-3">
                <li><a href="#"><i class="fab fa-facebook"></i></a></li>
                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                <li><a href="#"><i class="fa-brands fa-linkedin"></i></a></li>
                <li><a href=""><i class="fa-brands fa-youtube"></i></a></li>
        </div>
    </div>
    <div class="contenitore3 d-flex">
        <div>
            <ul class="mt-3 p-3">
                <li>
                    SOCIETA'
                </li>
                <li>
                    <a href="">Posizioni aperte</a>
                </li>
                <li>
                   <a href="">Stampa</a> 
                </li>
                <li> <a href="">Relazioni con gli investitori</a> </li>
                <li> <a href="">Boolbnb App - Ovunque tu sia</a> </li>
                <li> <a href="">Boolbnb Business Studio</a> </li>
            </ul>
        </div>
        <div>
            <ul class="mt-3 p-3">
                <li>AIUTO</li>
                <li> <a href="">Scopri come funziona Boolbnb</a> </li>
                <li> <a href="">Termini e condizioni</a> </li>
                <li> <a href="">Note legali</a> </li>
                <li> <a href="">Preferenze sui cookie</a> </li>
                <li> <a href="">Informativa sulla privacy</a> </li>
                <li> <a href="">Cyber Security</a> </li>
                <li> <a href="">COVID-19: consigli per i viaggiatori</a> </li>
            </ul>
        </div> 
        <div>
            <ul class="mt-3 p-3">
                <li>
                    INFORMAZIONI SU BOOLBNB
                </li>
                <li>
                <a href="">News</a> 
                </li>
                <li>
                <a href="">Lavora con noi</a>  
                </li>
                <li>
                <a href="">Investitori</a> 
                </li>
                <li>
                <a href="">Sostenibilità</a> 
                </li>
            </ul>
        </div>
    </div>
    <div class="contenitore2 mt-3 d-flex justify-content-center ">
        <span> <i class="fa-solid fa-location-dot"></i> italia  © 2023 Boolbnb, Inc. Tutti i diritti riservati </span>
    </div>
 </div>
</template>


<style lang="scss" scoped>
.contenitore {
    width: 100%;
    border: 1px solid black;
    background-color: black;
    color: white;
    .contenitore3 {
        width: 80%;
        margin: 0 auto;
        border: 1px solid black;

        li {
            list-style-type: none;
            margin-top: 10px;
            font-size: 15px;
            color: rgb(130, 179, 179);
            padding: 3px;
            a {
                text-decoration: none;
                color: rgb(86, 104, 104);
            }
            a:hover {
                    color: white;
                }
        }
    }
    .contenitore2{
        width: 80%;
        margin: 0 auto;
        border: 1px solid black;
         i {
            color: rgb(130, 179, 179);
            &:hover {
                color: white;
            }
        }

        li {
            list-style-type: none;
            margin-left: 10px;
            margin-top: 3px;
        }
    }
}
span {
    color: rgb(130, 179, 179);
}
.images {
    width: 70px;
}
a:hover {
    color: white;
}
.p-3 img {
    width: 90px;
}


@media (max-width: 768px) {
    .contenitore3 {
        display: flex;
        flex-direction: column;
    }
}

</style>