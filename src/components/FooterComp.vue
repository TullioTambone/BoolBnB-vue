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
        <div class="p-2">
            <h3 class="ms-4 ">boolbnb</h3>
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
            <ul class="mt-3">
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
            <ul class="mt-3">
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
            <ul class="mt-3">
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
        <span class="ms-5" > <i class="fa-solid fa-location-dot"></i> italia  © 2023 Boolbnb, Inc. Tutti i diritti riservati </span>
    </div>
 </div>







 <!-- <footer class="footer">
  <div class="footer-content">
    <div class="footer-logo">
      <h5>Boolbnb</h5>
    </div>
    <div class="footer-links">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Rooms</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    <div class="footer-social">
      <ul>
        <li><a href="#"><i class="fab fa-facebook"></i></a></li>
        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2023 Your Hotel Name. All rights reserved.</p>
  </div>
</footer> -->


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
            color: white;
        }

        li {
            list-style-type: none;
            margin-left: 10px;
            margin-top: 3px;
        }
    }
}
@media (max-width: 768px) {
    .contenitore3 {
        display: flex;
        flex-direction: column;
    }
}

/* Reset CSS styles for better consistency */
//  * {
//    margin: 0;
//    padding: 0;
//    box-sizing: border-box;
//  }

//  /* Styles for the footer */
//  .footer {
//    background: #112c38;
//    color: #fff;
//    padding: 20px 0;
//  }

//  .footer-content {
//    display: flex;
//    flex-wrap: wrap;
//    justify-content: space-between;
//    align-items: center;
//    max-width: 1200px;
//    margin: 0 auto;
//    padding: 0 20px;
//  }

//  .footer-logo img {
//    max-width: 150px;
//  }

//  .footer-links ul {
//    list-style: none;
//    display: flex;
//    flex-wrap: wrap;
//  }

//  .footer-links li {
//    margin-right: 20px;
//  }

//  .footer-links a {
//    color: #fff;
//    text-decoration: none;
//    transition: color 0.3s;
//  }

//  .footer-links a:hover {
//    color: #007bff;
//  }

//  .footer-social ul {
//    list-style: none;
//    display: flex;
//  }

//  .footer-social li {
//    margin-right: 10px;
//  }

//  .footer-social a {
//    color: #fff;
//    text-decoration: none;
//    font-size: 20px;
//    transition: color 0.3s;
//  }

//  .footer-social a:hover {
//    color: #007bff;
//  }

//  .footer-bottom {
//    text-align: center;
//    padding-top: 10px;
//    border-top: 1px solid #555;
//  }

//  /* Responsive styles */
//  @media (max-width: 768px) {
//    .footer-content {
//      flex-direction: column;
//      align-items: center;
//    }
  
//    .footer-links {
//      margin-top: 10px;
//      text-align: center;
//    }
  
//    .footer-links li {
//      margin-right: 10px;
//      margin-bottom: 10px;
//    }
  
//    .footer-social ul {
//      justify-content: center;
//      margin-top: 10px;
//    }
//  }


</style>