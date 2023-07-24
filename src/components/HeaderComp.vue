<script>
    export default {
        name: 'HeaderComp',
        
        data() {
            return {

            }
        },

    }
</script>
<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg bg-white">
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
                        <!-- <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li> -->
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<style lang="scss" scoped>

</style>