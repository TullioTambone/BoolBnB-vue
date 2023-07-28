<script>
import { store } from '../store.js'


export default {
  name: 'TeamComp',
  props: [],
  
  components: {
   
  },
  data() {
        return {
            store,
            
        };
    },
}
</script>


<template>
 <div class="container">
    <div class="w-50">
        <h2>Il Team</h2>
        <p>Benvenuti nel nostro team! Siamo un gruppo appassionato e dedicato di professionisti che lavorano insieme per raggiungere i nostri obiettivi. Scopri di più su di noi di seguito.</p>
    </div>
</div>
 <div class="container">
    <div class="row justify-content-around">
        <div class="col-12 col-md-5 col-lg-3" v-for="(elem, index) in store.arrayTeam" :key='index'>
            <div class="single-card">
                <img :src="elem.img" alt="">
            </div>
            <!-- <span>{{ elem.name }}</span> -->
        </div>
    </div>
 </div>
</template>


<style lang="scss" scoped>
.intro{
    h2{

    }
    p{

    }
}
.container{
    .row{
        .single-card{
            margin: 0 auto;
            width: 250px;
            height: 250px;
            img{
                width: 250px;
                max-height: 250px;
                object-fit: fill;
            }
            span{

            }
        }
    }
}
</style>