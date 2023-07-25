<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import { store } from '../store.js'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Autoplay',
  props: ["propsApartments"],
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
        return {
            store
        };
    },
})
</script>


<template>
  <div class="container position-relative d-flex justify-content-end">
    <div class="row ">
        <div class="position-absolute container-abs z-1">
          <div class="card d-flex align-items-center justify-content-center" style="width: 25rem;">
              <div class="p-1">
                <h4 class="mb-5">Cerca il tuo primo appartamento</h4>
                  <input class="form-control w-100" id="search" name="search" type="search" placeholder="Inserisci la città o l'indirizzo" aria-label="Search" v-model="this.address" @keyup="autocomplete()" list="datalistOptions">
                    <datalist id="datalistOptions">                           
                    </datalist>
                    <router-link class="btn btn-primary mt-4 w-100" to="/search">
                        Cerca
                    </router-link>
              </div>
          </div>
        </div>
    </div>
    <div class="contenitore">
      <Carousel id="carousel" :autoplay="2000" :wrap-around="true">
        <Slide id="slide" v-for="elem in propsApartments" :key="index">
          <div class="carousel__item">
            <img :src="`${store.baseUrl}/storage/${elem.cover}`"  alt=""> 
          </div>
        </Slide>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>
  
  </div>
</template>


<style lang="scss" scoped>
  .container {
    height: 70vh;
    padding: 3rem 0;
    .container-abs {
      top: 50%;
      left: -25%;
      transform: translate(0, -50%);

      .card {
        height: 250px;
        border-radius: 30px;
        margin: 0 auto;
      }
    }
    .contenitore {
      width: 70%;
      margin-right: 0;
      padding-bottom: 1rem;

      #carousel {
        height: 60vh;

        #slide {
          height: 60vh;

          .carousel__item {
            width: 100%;
            height: 100%;
               img {
            object-fit: fill;
            background-repeat: no-repeat;
          }
          }

       
        }
      }
    }
  }
  @media (min-width: 768px) {
    .container-abs {
      left: 50%;
      transform: translate(-50%, -50%);

      .card {
        width: 25rem;
        margin: 0 auto;
      }
    }

    .contenitore {
      width: 70%;
      margin: 0 auto;
    }
  }

  /* Media Query per larghezza minima di 425px (dispositivi mobili) */
  @media (min-width: 425px) {
    .container-abs {
      left: 50%;
      transform: translate(-50%, -50%);

      .card {
        width: 25rem;
        margin: 0 auto;
      }
    }

    .contenitore {
      width: 100%;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

</style>