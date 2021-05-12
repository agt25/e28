<template>
    <div class='container' id='register-view' v-cloak>
        <div class='row justify-content-center'>
                
                <h1>Join the Cafe</h1>
                </div>
                 <div class='signup-area'>
                <div class='row justify-content-center'>
         
            </div>
             <div class='row justify-content-center input-row'>
                
                   
                    <input class='login-input' data-test="name-input" placeholder="Name" type="text" v-model="data.name" required/>
                   
            </div>
            <div class='row justify-content-center input-row'>
                
                   
                    <input class='login-input' data-test="email-input" placeholder="Email" type="text" v-model="data.email" required/>
                   
            </div>
            <div class='row justify-content-center input-row'>
                
                   
                    <input class='login-input' data-test="password-input" placeholder="Password" type="password" v-model="data.password" required/>
                   
            </div>
            <div class='row justify-content-center input-row'>
                <button class="btn btn-warning" v-on:click="register" data-test="signup-button">Register</button>
                 <!-- <button class='btn btn-primary' v-on:click="login" data-test="login-button">Login</button> -->
                 <router-link class='login-link btn' to="/account" data-test="login-button">Login</router-link>

            </div>

            

            
            </div>



                <div class='row justify-content-center'>
            <ul v-if="errors">
                <li class="error" v-for="(error, index) in errors" :key="index">
                    {{ error }}
                </li>
            </ul>
            </div>
        </div>
    
</template>

<script>
import { axios } from "@/common/app.js";
export default {
    components: {
    },
    data() {
        return {
            errors: null,
            data: {
                name: "",
                email: "",
                password: "",
            },
            
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        register() {
            axios.post("register", this.data).then((response) => {
                if (response.data.success) {
                    this.$store.commit("setUser", response.data.user);
                    this.$router.push("/account");
                    
                } else {
                    this.errors = response.data.errors;
                }
            });
        },
    },
};
</script>

<style scoped>

[v-cloak] {
  display: none;
}



.error {
    font-size: 1.2rem;
    color: saddlebrown;

}

.login-link {
     color: rgb(87, 79, 6);
    border: 1px dotted saddlebrown;
}

#register-view {
    height: 100vh;
    margin-top: 4rem;
}

.input-row {
    padding: 1rem;
}

input {
    max-width: 600px;
    background-color: transparent;
    border-top: none !important;
    border-left: none !important;
    border-right: none !important;
    border-bottom: 1px solid saddlebrown;
    padding: 0.3rem;
}

.login-input {
    padding-left: 0.5rem;
}

.btn {
    margin: 1rem;
    font-size: 1.2rem;
}

h1 {
    color: rgb(173, 92, 12) !important;
    font-size: 1.9rem;
    margin-bottom: 1rem;
}

</style>