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
     <h1>Il Team  7️⃣</h1>
     <div class="card card__one">
        <div class="card__bg"></div>
        <img class="card__img" src="/img/01_gabri.png" />
        <div class="card__text">
            <p class="card__title">Gabriele Damiani</p>
        </div>
     </div>
     <div class="card card__two">
        <div class="card__bg"></div>
        <img class="card__img" src="/img/02_alva.png" />
        <div class="card__text">
            <p class="card__title">Alvaro Arbaiza</p>
        </div>
     </div>
     <div class="card card__three">
        <div class="card__bg"></div>
        <img class="card__img" src="/img/03_tullio.png" />
        <div class="card__text">
            <p class="card__title">Tullio Tambone</p>
        </div>
     </div>
     <div class="card card__four">
        <div class="card__bg"></div>
        <img class="card__img" src="/img/04_edo.png" />
        <div class="card__text">
            <p class="card__title">Edoardo Monti</p>
        </div>
     </div>
   </div>
</div>

</template>

<style lang="scss" scoped>


body {
  align-items: center;
  background: #642B73;
  background: linear-gradient(to bottom, #C6426E, #642B73);
  display: flex;
  font-family: 'Open Sans', sans;
  justify-content: center;
  overflow: hidden;
  perspective: 1800px;
  text-align: center;
  margin: 0 20px;
}

h1 {
  color: #3e3e42;
  font-size:32px;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 30px;
  transform: translateZ(35px);
}

h3 {
  color: #eb285d;
  font-size: 16px;
  margin-bottom: 6px;
  transform: translateZ(25px);
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
  min-width: 595px;
}

.card {
  border-radius: 15px;
  box-shadow: 5px 5px 20px -5px rgba(0,0,0,0.6);
  // cursor: pointer;
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
  
  &:not(:last-child) {
    margin-right: 30px;
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

  .card__text {
    // background-color: #254b60;
  }
}

.card__two {
  .card__img {
    top: 25px;
    right: 10px;
  }
  .card__bg {
    // background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_spirited.jpg') center / cover no-repeat;
  }
  .card__text {
    //background-color: #274a2e;
  }
}

.card__three {
  .card__img {
    top: 5px;
    left: -4px;
    height: 110%;
  }
  .card__bg {
    // background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/62105/3dr_howlbg.jpg') center / cover no-repeat;
  }
  .card__text {
    //background-color: #3e2222;
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