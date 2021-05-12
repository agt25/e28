<template>
    <div class='container' id="account-view">
        <div v-if="user" class='user-area'>
            <div class='row justify-content-center input-row'>
                  <h2 data-test="greeting">Hello, {{ user.name }}!</h2>
                  <p> </p>
            </div>
            <div class='row justify-content-center input-row'>
                  <button class='btn btn-primary' v-on:click="logout" data-test="logout-button">Logout</button>
            </div>
            

           

           
        </div>

        <div v-else class='login-area'>
           <div class='row justify-content-center'>
            <h2>Login Area</h2>
            </div>
            <div class='row justify-content-center input-row'>
                
                   
                    <input class='login-input' data-test="email-input" placeholder="Email" type="text" v-model="data.email" required/>
                   
            </div>
            <div class='row justify-content-center input-row'>
                
                   
                    <input class='login-input' data-test="password-input" placeholder="Password" type="password" v-model="data.password" required/>
                   
            </div>
            <div class='row justify-content-center input-row'>
                 <button class='btn btn-primary' v-on:click="login" data-test="login-button">Login</button>
                 <router-link to="/register" data-test="signup-button">Register</router-link>

            </div>

            
            <div class='row justify-content-center'>
            <ul v-if="errors">
                <li class="error" v-for="(error, index) in errors" :key="index">
                    {{ error }}
                </li>
            </ul>
            </div>


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
            data: {
                name: "",
                email: "",
                password: "",
            },
            errors: null,
            
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        
    },
    methods: {
        
        login() {
            axios.post("login", this.data).then((response) => {
                if (response.data.authenticated) {
                    this.$store.commit("setUser", response.data.user);
                } else {
                    this.errors = response.data.errors;
                }
            });
        },
        logout() {
            axios.post("logout").then((response) => {
                if (response.data.success) {
                    this.$store.commit("setUser", false);
                }
            });
        },
        register() {
            axios.post("register", this.data).then((response) => {
                if (response.data.authenticated) {
                    this.$store.commit("setUser", response.data.user);
                } else {
                    this.errors = response.data.errors;
                }
            });
        },
    },
    watch: {
        
    },
    mounted() {
        
    },
};
</script>
<style scoped>

.error {
    font-size: 1.2rem;
    color: saddlebrown;

}

.user-area {
    margin-top: 4rem;
}

#account-view {
    height: 100vh;
}

.login-area {
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
