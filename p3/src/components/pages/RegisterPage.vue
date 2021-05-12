<template>
    <div class='container' id='register-view'>
        <div class='row justify-content-center'>
                
                <h2>Join the Cafe</h2>
                </div>
                 <div class='signup-area'>
                <div class='row justify-content-center'>
         
            </div>
             <div class='row justify-content-center input-row'>
                
                   
                    <input class='login-input' data-test="name" placeholder="Name" type="text" v-model="data.name"/>
                   
            </div>
            <div class='row justify-content-center input-row'>
                
                   
                    <input class='login-input' data-test="email" placeholder="Email" type="text" v-model="data.email"/>
                   
            </div>
            <div class='row justify-content-center input-row'>
                
                   
                    <input class='login-input' data-test="password" placeholder="Password" type="password" v-model="data.password" />
                   
            </div>
            <div class='row justify-content-center input-row'>
                <button class="btn btn-primary" v-on:click="register" data-test="register-button">Register</button>
                 <!-- <button class='btn btn-primary' v-on:click="login" data-test="login-button">Login</button> -->
                 <router-link to="/account" data-test="login-button">Login</router-link>

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

.error {
    font-size: 1.2rem;
    color: slategray;

}

#register-view {
    height: 100vh;
    margin-top: 4rem;
}

.input-row {
    padding: 1rem;
}

input {
    max-width: 500px;
}

.btn {
    margin-right: 2rem;
}

h2 {
    color: teal;
}

</style>