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
    created(){
        this.getSingleApartment()
    },
    methods:{
        getSingleApartment(){
            axios.get(`${this.baseUrl}/api/apartments/${this.$route.params.slug}`)
            .then(res => {
                this.apartment = res.data.apartment.data;
            },error => {
                if(this.res.data.data.success){
                    this.$router.push({name: 'NotFound'})
                }
            })
        }
    }
}
</script>

<template>

</template>

<style lang="scss" scoped>

</style>