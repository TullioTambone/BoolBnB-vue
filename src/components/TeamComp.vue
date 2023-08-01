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
    mounted(){
        this.cardTeam();
    },
    methods: {
        cardTeam(){
            const cards = document.querySelector(".cards");
            const images = document.querySelectorAll(".card__img");
            const backgrounds = document.querySelectorAll(".card__bg");
            const range = 40;

            // const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2)).toFixed(1);
            const calcValue = (a, b) => (a/b*range-range/2).toFixed(1) // thanks @alice-mx

            let timeout;
            document.addEventListener('mousemove', ({x, y}) => {
            if (timeout) {
                window.cancelAnimationFrame(timeout);
            }
                
            timeout = window.requestAnimationFrame(() => {
                const yValue = calcValue(y, window.innerHeight);
                const xValue = calcValue(x, window.innerWidth);

                cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

                [].forEach.call(images, (image) => {
                image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
                });

                [].forEach.call(backgrounds, (background) => {
                background.style.backgroundPosition = `${xValue*.45}px ${-yValue*.45}px`;
                })
                })
            }, false);
        }
    }
}
</script>


<template>

<div class="d-flex justify-content-center">
    <div class="cards">
        <h3>Boolean</h3>
        <h2>Team 
            <span class="number-team">
                7
            </span>
        </h2>
        <div class="row justify-content-center">
            <div class="card card__one col-12 col-md-6 col-lg-3 my-1">
                <div class="card__bg"></div>
                <img class="card__img" src="/img/01_gabri.png" />
                <div class="card__text">
                    <p class="card__title">Gabriele Damiani</p>
                </div>
            </div>
            <div class="card card__two col-12 col-md-6 col-lg-3 my-1">
                <div class="card__bg"></div>
                <img class="card__img" src="/img/02_alva.png" />
                <div class="card__text">
                    <p class="card__title">Alvaro Arbaiza</p>
                </div>
            </div>
            <div class="card card__three col-12 col-md-6 col-lg-3 my-1">
                <div class="card__bg"></div>
                <img class="card__img" src="/img/03_tullio.png" />
                <div class="card__text">
                    <p class="card__title">Tullio Tambone</p>
                </div>
            </div>
            <div class="card card__four col-12 col-md-6 col-lg-3 my-1">
                <div class="card__bg"></div>
                <img class="card__img" src="/img/04_edo.png" />
                <div class="card__text">
                    <p class="card__title">Edoardo Monti</p>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>

.d-flex {
    .cards {

        h3 {
            font-size: 16px;
            margin-bottom: 6px;
            transform: translateZ(25px);
            color: #C6AB7C;
            font-weight: 800;
        }
        h2 {
            margin-bottom: 1rem;
            .number-team {
                background-color: #C6AB7C;
                padding: 0.1rem 0.4rem;
                border-radius: 5px;
            }
        }
    }
}


.cards {
    cursor: pointer;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0px 10px 20px 20px rgba(0,0,0,0.17);
    display: inline-block;
    padding: 30px 35px;
    perspective: 1800px;
    text-align: left;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;
    transform: rotateX(11deg) rotateY(16.5deg);
}

.card {
    border-radius: 15px;
    box-shadow: 5px 5px 20px -5px rgba(0,0,0,0.6);
    display: inline-block;
    height: 250px;
    overflow: hidden;
    perspective: 1200px;
    position: relative;
    transform-style: preserve-3d;
    transform: translatez(35px);
    transition: transform 200ms ease-out;
    width: 175px;
    text-align: center;
    
    &:hover {
        box-shadow: 5px 5px 20px -7px rgba(0,0,0,0.5);
        transform: translatez(60px);
    }
  
}

.card__img {
    position: relative;
    height: 100%;
}

.card__bg {
    bottom: -50px;
    left: -50px;
    position: absolute;
    right: -50px;
    top: -50px;
    transform-origin: 50% 50%;
    transform: translateZ(-50px);
    z-index: 0;
}

.card__one {
    .card__img {
        top: 14px;
        right: 50px;
        height: 110%;
    }
}

.card__two {
    .card__img {
        top: 25px;
        right: 10px;
    }
}

.card__three {
    .card__img {
        top: 5px;
        left: -4px;
        height: 110%;
    }
}

.card__four {
    .card__img {
        top: 5px;
        left: -4px;
        height: 110%;
    }
}


.card__text {
    align-items: center;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.55) 100%);
    bottom: 0;
    display: flex;
    flex-direction: column; 
    height: 70px;
    justify-content: center;
    position: absolute;
    width: 100%;
    z-index: 2;
}

.card__title {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding: 0 10px;
    margin-bottom: 3px;
}
</style>