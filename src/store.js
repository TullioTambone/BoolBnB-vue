import { reactive } from 'vue';

export const store = reactive({    
    baseUrl: "http://127.0.0.1:8000",
    address: "",
    nonSponsoredApartments: [],
    sponsoredApartments: [],
    arrayTeam:[
        {
            name: 'Gabriele Damiani',
            img: "/img/01_gabri.png",
            description: 'Il Trombettista'
        },
        {
            name: 'Alvaro Arbaiza',
            img: "/img/02_alva.png",
            description: 'Il Canterino'
        },
        {
            name: 'Tullio Tambone',
            img: "/img/03_tullio.png",
            description: 'La Secchia'
        },
        {
            name: 'Edoardo Monti',
            img: "/img/04_edo.png",
            description: 'Lo Spilungone'
        },
    ],
    activeSlide: 0,
    
    
})