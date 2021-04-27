import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';



import App from './App.vue'

import ListenPage from '@/components/pages/ListenPage.vue';
import LikedPage from '@/components/pages/LikedPage.vue';
import ExplorePage from '@/components/pages/ExplorePage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: ListenPage, props: true },
        { path: '/tracks/liked', component: LikedPage, props: true },
        { path: '/tracks/categories', component: ExplorePage, props: true },
    ]
});

createApp(App).use(router).mount('#app');

