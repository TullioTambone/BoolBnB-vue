<script>
    export default {
        name: 'HeaderComp',

        data() {
            return {
            }
        },
        mounted() {
            window.addEventListener('wheel', this.scroll);
        },
        beforeUnmount() {
            window.removeEventListener('wheel', this.scroll);
        },
        methods: {
            scroll(event) {

                const scrollDirection = event.deltaY > 0 ? 'down' : 'up';
                // altezza visibile della finestra del browser
                const windowHeight = window.innerHeight;

                // altezza totale del documento HTML
                const documentHeight = document.documentElement.scrollHeight;

                // posizione verticale dello scroll della finestra rispetto all'inizio del documento
                const scrollPosition = window.scrollY;

                const remainingDistance = documentHeight - (scrollPosition + windowHeight);

                const nav = document.querySelector('nav');
                
                // se delta è positivo e quindi scorri verso il basso
                // if (remainingDistance < 500) {

                //     document.querySelector('nav').style.filter = 'opacity(0.5)';
                // }

                if (scrollDirection === 'down') {
                    // Se l'utente ha scorso più di 100px dalla parte superiore della pagina, applica lo stile filtrato
                    if (scrollPosition > 80) {
                        nav.style.background = '#ffffff';
                    } else {
                        // Altrimenti, rimuovi lo stile filtrato
                        nav.style.background = '#ffffff5e';
                    }
                } else {
                    // Se l'utente sta scorrendo verso l'alto e la distanza rimanente dalla parte superiore è inferiore a 80px, applica lo stile filtrato
                    if (scrollPosition <= 80) {
                        nav.style.background = '#ffffff5e';
                    }
                }
            }
        }
    }
</script>
<template>

    <!-- nav -->
    <nav class="navbar navbar-expand-lg py-1 z-3">
        <div class="container">

            <!-- logo -->
            <div class="logo">
                <router-link class="nav-link" to="/">
                    <img src="/img/Boolbnb-logo-transparent.png" alt="Boolbnb logo">
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
                        <router-link class="nav-link" to="/">
                            <i class="fa-solid fa-house-user me-2"></i>
                            <span>
                                Home
                            </span>
                        </router-link>
                    </li>

                    <!-- login -->
                    <li>
                        <a class="nav-link" aria-current="page" href="http://127.0.0.1:8000/login"> 
                            <i class="fa-solid fa-user me-2"></i>
                            <span>
                                Profilo
                            </span>
                        </a>
                    </li>
                    <li>
                        <router-link class="nav-link" to="/search">
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
    height: 5rem;
    width: 100vw;
    margin-top: 0;
    padding: 0;
    display: flex;
    align-items: center;
    background: #ffffff5e;
    position: fixed;
    top: 0;
    left: 0;
    transition: 0.2s;
    // filter: opacity(0.5);
    
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
            // background-color: #fff;
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
                    font-family: sans-serif;
                    color: #C6AB7C;
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
                        background: #C6AB7C;
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
            
                }
                
                &:hover a {
                    color: #ffffff ;
                    transform: scale(1.1);
                    opacity: 0.95;
                    // filter: blur(0);
                    text-decoration: none;

                    // &:not(:hover) {
                    //     filter: blur(1px);
    
                    // }
                }

            }            
        }    
    }
}

</style>