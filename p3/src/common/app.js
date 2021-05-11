import { reactive } from 'vue'


export const axios = require('axios').create({
    baseURL: process.env.VUE_APP_API_URL ?? 'http://e28api.vue28.loc',
    responseType: 'json',
    withCredentials: true,
    headers: {
    
  }
})




// To begin, our store will contain one property, `cartCount`
export const store = reactive({
    // cartCount: 0
});
