<script>
    export default {
        name: 'HeaderComp',

        data() {
            return {

            }
        },
        methods: {

        }

    }
</script>
<template>


    <!-- <nav class="navbar navbar-expand-lg bg-white">
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 column-gap-4">
                        <li class="nav-item fs-5 fw-semibold text-uppercase">
                            <router-link class="nav-link" to="/">
                                Home                       
                            </router-link > 
                        </li>
                        <li class="nav-item fs-5 fw-semibold text-uppercase">
                            <a class="nav-link" aria-current="page" href="http://127.0.0.1:8000/login">Login</a>
                        </li>
                        <li class="nav-item fs-5 fw-semibold text-uppercase">
                            <router-link class="nav-link" to="/search">
                                <span>
                                    Search
                                </span>                           
                            </router-link > 
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav> -->


    <nav class="navbar navbar-expand-lg py-1 z-3">
        <div class="container-fluid d-flex justify-content-between">
            <div>
                <h1>BoolBnB</h1>
            </div>


    

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon icona-cl"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li>
                        <router-link class="nav-link" to="/">
                            Home
                        </router-link>
                    </li>
                    <li>
                        <a class="nav-link" aria-current="page" href="http://127.0.0.1:8000/login">Login</a>
                    </li>
                    <li>
                        <router-link class="nav-link" to="/search">
                            <span>
                                Cerca
                            </span>
                        </router-link>
                    </li>

                </ul>
            </div>
        </div>
    </nav>

</template>
<style scoped>
    h1 {
        color: #fff;
        padding-left: 20px;
        font-family: sans-serif;
    }

    .navbar-toggler {

        background-color: #fff;
        margin: 15px;
    }

    nav {
        margin-top: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #112c38;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
    }

    .navbar-collapse {
        flex-grow: 0;
    }

    ul {
        margin: 0;
        padding: 15px;
        display: flex;
    }

    ul li {
        list-style: none;
        margin: 0 20px;
        transition: 0.5s;
        padding: 11px;

    }

    ul li a {
        display: block;
        position: relative;
        text-decoration: none;
        padding: 5px;
        font-size: 16px;
        font-family: sans-serif;
        color: #fff;
        text-transform: uppercase;
        transition: 0.5s;

    }

    ul:hover li a {
        transform: scale(1);
        opacity: 0.2;
        filter: blur(1px);
    }

    ul li a:hover {
        transform: scale(1.1);
        opacity: 0.9;
        filter: blur(0);
        text-decoration: none;
        color: #112c38;
    }

    ul li a:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 7px;
        background: #fff;
        transition: 0.5s;
        transform-origin: right;
        transform: scaleX(0);
        z-index: -1;
    }

    ul li a:hover:before {
        transition: transform 0.5s;
        transform-origin: left;
        transform: scaleX(1);
    }
</style>