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
   
    <div class="col-12 col-md-4">
        <div  class="card p-1 ">
            <div class="zoom">
                <!-- <img :src="`${store.baseUrl}/storage/${propsCard.cover}`"   class="card-img-top" alt="propsCard.title"> -->
                <img :src="propsCard.cover" class="card-img-top" :alt="propsCard.title">

            </div>
            <h5 class="card-title">{{ propsCard.title }}</h5>
            <p class="card-text">{{ propsCard.description }}</p>
            <ul>
                <li class="list-group-item">{{ propsCard.address }}</li>
                <li class="list-group-item">n stanze da letto: {{ propsCard.bedrooms }} <br>
                    n bagni {{ propsCard.bathrooms }}</li>
                <li class="list-group-item">prezzo:{{ propsCard.price }}</li>
            </ul>
        </div>
    </div>
</template>



<style lang="scss" scoped>
    body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  flex: 0 0 calc(33.33% - 10px); /* Dividere il contenitore in tre colonne con uno spazio di 10px tra le card */
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: auto;
  display: block;
}

/* Stile aggiuntivo per rendere il layout più accattivante */
.card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

.zoom {
    overflow: hidden;
    width: 100%;
    height: 100%px;
}
img {
    transition: all 0.7s ease-in-out;
}
.zoom:hover img {
    transform: scale(1.5);
    filter: brightness(0.7);
    transition: transform 0.9s ease;
}


</style>