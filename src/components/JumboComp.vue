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
          <div class="card d-flex align-items-center justify-content-center">
              <div class="p-1 box-card">
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
    height: 90vh;
    padding: 3rem 0;
    margin-left: 20px;
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
      width: 80%;
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