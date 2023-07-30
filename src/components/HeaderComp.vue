<script>
    export default {
        name: 'HeaderComp',

        data() {
            return {
                hovering: false,
                hover: true
            }
        },
        mounted() {
            window.addEventListener('wheel', this.scroll);
        },
        beforeUnmount() {
            window.removeEventListener('wheel', this.scroll);
        },
        methods: {
            handleHover(event) {
                // Set the hovering flag based on mouseenter and mouseleave events
                this.hovering = event.type === 'mouseenter';
                const link = event.target; 
                const a = document.querySelectorAll('.nav-link');
                const nav = document.querySelector('nav');

                if (this.hovering && this.hover) {
                    link.style.color = '#C6AB7C';
                } else if (this.hovering && !this.hover) {
                    nav.style.background = '#ffffff';
                } else {
                    link.style.color = '#ffffff';
                }

            },
            handleHoverOut(event) {
                // Set the hovering flag based on mouseenter and mouseleave events
                this.hovering = event.type === 'mouseleave';
                const a = document.querySelectorAll('.nav-link');
                const link = event.target;
                const nav = document.querySelector('nav');

                if (this.hovering && this.hover) {
                    link.style.color = '#ffffff';
                    
                } else if (this.hovering && !this.hover) {
                    nav.style.background = '#ffffffda';
                }
            },
            scroll(event) {

                const scrollDirection = event.deltaY > 0 ? 'down' : 'up';

                // posizione verticale dello scroll della finestra rispetto all'inizio del documento
                const scrollPosition = window.scrollY;

                const nav = document.querySelector('nav');
                const a = document.querySelectorAll('.nav-link');
                const logo = document.querySelector('.logo-img');

                if (scrollDirection === 'down') {
                    // Se l'utente ha scorso più di 100px dalla parte superiore della pagina, applica lo stile filtrato
                    if (scrollPosition > 500) {
                        this.hover = false;
                        nav.style.background = '#ffffffda';
                        a.forEach( (elem) => {
                            elem.style.color = '#C6AB7C';
                        })
                        logo.src = '/img/Boolbnb-logo-transparente.png'
                    } else {
                        this.hover = true;
                        // Altrimenti, rimuovi lo stile filtrato
                        nav.style.background = '#C6AB7C';
                        a.forEach( (elem) => {
                            elem.style.color = '#ffffff';
                        })
                        logo.src = '/img/Boolbnb-logo-transparente-white.png'
                    }
                } else {
                    // Se l'utente sta scorrendo verso l'alto e la distanza rimanente dalla parte superiore è inferiore a 500px, applica lo stile filtrato
                    if (scrollPosition < 600) {
                        this.hover = true;
                        nav.style.background = '#C6AB7C';
                        a.forEach( (elem) => {
                            elem.style.color = '#ffffff';
                        })
                        logo.src = '/img/Boolbnb-logo-transparente-white.png'
                    }
                }
            }
        }
    }
</script>
<template>

    <!-- nav -->
    <nav class="navbar navbar-expand-sm py-1">
        <div class="container">

            <!-- logo -->
            <div class="logo">
                <router-link class="nav-link" to="/">
                    <img class="logo-img" src="/img/Boolbnb-logo-transparente-white.png" alt="Boolbnb logo">
                </router-link>
            </div>

            <!-- burguer menu on mobile and tablet-->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon icona-cl"></span>
            </button>

            <!-- links -->
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mb-2 mb-lg-0">

                    <!-- home -->
                    <li>
                        <router-link class="nav-link" to="/"  @mouseenter="handleHover" @mouseleave="handleHoverOut">
                            <i class="fa-solid fa-house-user me-2"></i>
                            <span>
                                Home
                            </span>
                        </router-link>
                    </li>

                    <!-- login -->
                    <li>
                        <a class="nav-link" aria-current="page" href="http://127.0.0.1:8000/login"  @mouseenter="handleHover" @mouseleave="handleHoverOut"> 
                            <i class="fa-solid fa-user me-2"></i>
                            <span>
                                Profilo
                            </span>
                        </a>
                    </li>
                    <li>
                        <router-link class="nav-link" to="/search"  @mouseenter="handleHover" @mouseleave="handleHoverOut">
                            <span>
                                <i class="fa-solid fa-magnifying-glass"></i> Cerca
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- colori
    Beige (#DDD0C8),
    dark grey (#323232),
    bianco
    nero 
    -->

</template>
<style lang="scss" scoped>

// nav
.navbar {
    height: 4.5rem;
    width: 100vw;
    margin-top: 0;
    padding: 0;
    display: flex;
    align-items: center;
    background: #C6AB7C;
    position: fixed;
    top: 0;
    left: 0;
    transition: 0.2s;
    z-index: 999999999;
    
    .container {
        height: 100%;

        // logo
        .logo {
            height: 100%;

            a {
                height: 100%;

                img {
                    height: 100%;
                }
            }
        }

        .navbar-toggler {
            margin: 15px;
        }
    
        .navbar-collapse {
            flex-grow: 0;
        }
    
        ul {
            margin: 0;
            padding: 15px;

            li {
                height: 100%;
                list-style: none;
                margin: 0 20px;
                transition: 0.5s;

                a {
                    height: 100%;
                    display: block;
                    position: relative;
                    text-decoration: none;
                    padding: 5px;
                    font-size: 16px;
                    color: #ffffffd3;
                    text-transform: uppercase;
                    transition: 0.5s;            
                    
                    &:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 7px;
                        background: #ffffff;
                        transition: 0.5s;
                        transform-origin: right;
                        transform: scaleX(0);
                        z-index: -1;
                    }
                    
                    &:hover:before {
                        transition: transform 0.5s;
                        transform-origin: left;
                        transform: scaleX(1);
                    }
            
                    &:hover {
                        color: #C6AB7C;
                        transform: scale(1.1);
                    }
                }
                

            }            
        }    
    }
}

@media screen and (max-width: 575.98px) {
    
    .navbar-collapse{
        background-color: rgba($color: #000000, $alpha: 0.6);
        height: 130px;
        border-radius: 20px;
        animation:altezza 0.5s;
    }
    
    
    
    @keyframes altezza{
        from{
            height: 0px;
        }
        to{
            height: 130px;
        }
    }
}
</style>