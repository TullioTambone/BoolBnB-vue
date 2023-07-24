import { defineStore } from 'pinia';
import ttServices from "@tomtom-international/web-sdk-services";

export const myStore = defineStore('myStore', {

    // variabili
    state: () => {
        return { 
            address: '',
            isAddressOk: false
        }
    },

    // metodi
    actions: {
        autocomplete() {
    
            // Ottenimento dell'indirizzo dal campo input
            const search = document.querySelector('#search');
        
            if( search.value ) {

                ttServices.services.geocode({
                    batchMode: 'async',
                    key: "74CVsbN34KoIljJqOriAYN2ZMEYU1cwO",
                    query: search.value,
                    countrySet: 'IT',
                    language: 'it-IT',
                }).then(
                    function (response) {
                        
                        const results = response.results;
                        console.log(results)                
        
                        // se abbiamo dei risultati ottenuti
                        if (results.length)  {   
        
                            for (const elem of results) {
                                document.getElementById('datalistOptions').innerHTML += `<option value="${elem.address.freeformAddress}">${elem.address.freeformAddress}</option>`;
                            }
                        }
                        
                    }
                );
            } 
        },
    },
})