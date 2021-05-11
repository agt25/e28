import Cart from '@/common/Cart.js';
import { reactive } from 'vue'

export const axios = require('axios').create({
    baseURL: process.env.VUE_APP_API_URL ?? 'http://e28api.hesweb.loc',
    responseType: 'json',
    withCredentials: true
})

export const cart = new Cart();

// To begin, our store will contain one property, `cartCount`
export const store = reactive({
    cartCount: 0
});

