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
 <div class="contenitore border-top">
    <div class="contenitore2 d-flex justify-content-between ">
        <div class="p-3">
            <img class="logo-img" src="/img/Boolbnb-logo-transparente.png" alt="Boolbnb logo">
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
                    <strong>SOCIETA'</strong>
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
                <li>
                    <strong>AIUTO</strong>
                </li>
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
                    <strong>INFORMAZIONI SU BOOLBNB</strong>
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
    background-color: rgb(255, 255, 255);
    color: white;
    .contenitore3 {
        width: 80%;
        margin: 0 auto;

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
                    color: gold;
                }
        }
    }
    .contenitore2{
        width: 80%;
        margin: 0 auto;
         i {
            color: rgb(130, 179, 179);
            &:hover {
                color: gold;
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
    color: gold;
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