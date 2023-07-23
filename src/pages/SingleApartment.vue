<script>
import axios from 'axios';

export default{
    name:"SingleApartment",
    data(){
        return{
            baseUrl:'http://127.0.0.1:8000',
            apartment: null
        }
    },
    mounted(){
        this.getSingleApartment()
    },
    methods:{
        getSingleApartment(){
            axios.get(`${this.baseUrl}/api/apartments/${this.$route.params.slug}`)
            .then(res => {
                this.apartment = res.data.apartment;
                console.log(res.data)
            }
            ,error => {
                if(this.res.data.data.success){
                    this.$router.push({name: 'NotFound'})
                }
            })
        }
    }
}
</script>

<template>
    <div v-if="apartment">

        <h3>{{ apartment.title }}</h3>
    </div>
        
</template>

<style lang="scss" scoped>

</style>