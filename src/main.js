import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { OhVueIcon, addIcons } from "oh-vue-icons";


const app = createApp(App)
const pinia = createPinia();

app.component("v-icon", OhVueIcon);
app.use(router)
app.use(pinia);
app.mount('#app')
