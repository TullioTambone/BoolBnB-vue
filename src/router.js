import{createRouter, createWebHistory} from 'vue-router'

import HomeComp from './pages/HomeComp.vue';
import SearchComp from './pages/SearchComp.vue'
import SingleApartment from './pages/SingleApartment.vue'
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeComp
        },
        {
            path: '/search',
            name: 'Search',
            component: SearchComp
        },
        {
            path: '/search/:slug',
            name: 'SingleApartment',
            component: SingleApartment
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})
export default router;