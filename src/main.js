import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
//importare bootstrap js
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import router from "./router";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app')