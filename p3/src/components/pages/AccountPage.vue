<template>
    <div class='container' id="account-view">
        <div v-if="user" class='user-area'>

            <!-- Greeting for logged in users --> 
            <div class='row justify-content-center input-row'>
                <h2 data-test="greeting">Hello, {{ user.name }}!</h2>
            </div>
            <div class='row justify-content-center input-row text-center'>
                <p id='subheading'>Head out to the lounge area and join the crowd!</p>
            </div>

            <!-- Logout for logged in users -->
            <div class='row justify-content-center input-row'>
                <button class='btn btn-warning logout-btn' v-on:click="logout" data-test="logout-button">Logout</button>
            </div>
        
        </div>

        <!-- Login form -->
        <div v-else class='login-area'>
           <div class='row justify-content-center'>
                <h1>Login</h1>
            </div>

            <!-- Email row -->
            <div class='row justify-content-center input-row'>
                <input class='login-input' data-test="email-input" placeholder="Email" type="text" v-model="data.email" required/>    
            </div>

            <!-- Password row -->
            <div class='row justify-content-center input-row'> 
                <input class='login-input' data-test="password-input" placeholder="Password" type="password" v-model="data.password" required/>   
            </div>

            <!-- Login and register buttons -->
            <div class='row justify-content-center input-row'>
                 <button class='btn btn-warning' v-on:click="login" data-test="login-button">Login</button>
                 <router-link class='register-link btn' to="/register" data-test="signup-button">Register</router-link>
            </div>

            <!-- Form validation errors -->
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
            // Log a user in
            axios.post("login", this.data).then((response) => {
                if (response.data.authenticated) {
                    this.$store.commit("setUser", response.data.user);
                } else {
                    this.errors = response.data.errors;
                }
            });
        },
        logout() {
            // Log a user out
            axios.post("logout").then((response) => {
                if (response.data.success) {
                    this.$store.commit("setUser", false);
                }
            });
        },
        register() {
            // Register a user
            axios.post("register", this.data).then((response) => {
                if (response.data.authenticated) {
                    this.$store.commit("setUser", response.data.user);
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
    color: saddlebrown;

}

.register-link {
    color: rgb(87, 79, 6);
    border: 1px dotted saddlebrown;
    
}

#subheading {
    font-size: 1.2rem;
    color: teal;
    
}

.logout-btn {
    color: rgba(137, 28, 108, 0.795);
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

.login-input {
    padding-left: 0.5rem;
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


.btn {
    margin: 1rem;
    font-size: 1.2rem;
}

h2 {
color: rgb(173, 92, 12) !important;
    font-size: 1.9rem;
    margin-bottom: 1rem;  
}

h1 {
    color: rgb(173, 92, 12) !important;
    font-size: 1.9rem;
    margin-bottom: 1rem;
}
</style>
