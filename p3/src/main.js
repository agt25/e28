import { createApp } from 'vue';
import { store } from "@/common/store.js";
import { router } from "@/common/router.js";
import Vuex from 'vuex';

import App from './App.vue'



createApp(App).use(router).use(store).mount('#app');

