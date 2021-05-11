import { createApp } from 'vue'
import { router } from "@/common/router.js";
import { store } from "@/common/store.js";
import App from './App.vue'

createApp(App).use(router).use(store).mount('#app');