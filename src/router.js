import{createRouter, createWebHistory} from 'vue-router'

import HomeComp from './pages/HomeComp.vue';
import SearchComp from './pages/SearchComp.vue'

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
        }
    ]
})
export default router;