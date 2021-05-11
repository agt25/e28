<template>
    <div id='account-page'>
     <div id='logo'>
    <img src="../../assets/images/logo.svg"></div>
    <div class='music'>
              <p id="code"><span>CA</span>F<span>E</span></p></div>

    <div class='container-fluid'>
        <div v-if="user" class='row justify-content-center'>
            <h2 data-test="welcome-message">Hi, {{ user.name }}!</h2>
            
           <br>
       
        </div>
        <!-- <div v-if='!user && success' class='row justify-content-center'>
            Hold on tight while we set up your account!
        </div> -->
         <!-- <div v-if="greeting != null" class='row justify-content-center'>
            Hi, {{ greeting }}
        </div> -->
        <div v-if="user" class='row justify-content-center'>
            <button v-on:click="logout" data-test="logout-button">
                Logout
            </button>
           <br>
        </div>
            
            
        </div>

        <div v-if='!user && !registerShowing' id="loginForm" class='container-fluid'>
            <div class='row justify-content-center login-header'>
            <h2>Login</h2>
            </div>
            <div class='form-group row justify-content-center'>
                <input
                    class='form-control'
                    placeholder="Email"
                    type="text"
                    v-model="data.email"
                    data-test="email-input"
                    v-on:blur='validate'
                    
                />
               
            <error-field
                v-if="errors && 'email' in errors"
                v-bind:errors="errors.email"
            ></error-field>
            </div>
            <div class='form-group row justify-content-center password'>   
                <input
                    class='form-control'
                    placeholder="Password"
                    type="password"
                    v-model="data.password"
                    data-test="password-input"
                    required
                    v-on:blur='validate'
                    
                />
                <error-field
                v-if="errors && 'password' in errors"
                v-bind:errors="errors.password"
            ></error-field>
            </div>
            <ul v-if="loginErrors">
                <li class="error" v-for="(error, index) in loginErrors" :key="index">
                    {{ error }}
                </li>
            </ul>


            <div class='row justify-content-center'>
            <button v-on:click="login" data-test="login-button">Login</button>
           
            </div>

            <div class='row justify-content-center'>
                Don't have an account?
            <button v-on:click="renderRegister" data-test="signup-button">Sign Up</button>
           
            </div>
        </div>
       
    </div>
     <div v-if='!user && registerShowing'>
                 <div id="signupForm" class='container-fluid'>
            <div class='row justify-content-center login-header'>
            <h2>Sign Up</h2>
            </div>
            <div class='form-group row justify-content-center name'>
                <input
                    class='form-control'
                    placeholder="Name"
                    type="text"
                    v-model="data.name"
                    data-test="name-input"
                    
                    required
                    v-on:blur='validate'
                    
                />
                 <small class="form-help">Required Field, Min: 2</small>
                <error-field
                v-if="errors && 'name' in errors"
                v-bind:errors="errors.name"
            ></error-field>
            </div>


            <div class='form-group row justify-content-center email'>   
                <input
                    class='form-control'
                    placeholder="Email"
                    type="email"
                    v-model="data.email"
                    data-test="email-input"
                    
                    required
                    v-on:blur='validate'
                    
                />
                <error-field
                v-if="errors && 'email' in errors"
                v-bind:errors="errors.email"
            ></error-field>
            </div>
            <div class='form-group row justify-content-center password'>   
                <input
                    class='form-control'
                    placeholder="Password"
                    type="password"
                    v-model="data.password"
                    data-test="password-input"
                    v-on:blur='validate'
                    required
                    
                />
                <error-field
                v-if="errors && 'password' in errors"
                v-bind:errors="errors.password"
            ></error-field>
            </div>
             <ul v-if="registerErrors">
                <li class="error" v-for="(error, index) in registerErrors" :key="index">
                    {{ error }}
                </li>
            </ul>

            <div class='row justify-content-center'>
            <button v-on:click="register" data-test="signup-button">Sign Up</button>
            </div>

            <div class='row justify-content-center'>
                Already have an account?
            <button v-on:click="renderLogin" data-test="login-button">Login</button>
           
            </div>
        </div>
       
    </div>

    
</template>

<script>
import { axios } from "@/common/app.js";
import Validator from 'validatorjs'
import ErrorField from "@/components/ErrorField.vue";

export default {
    components: {
        "error-field": ErrorField,
    },
    data() {
        return {
            // Form is prefilled for demonstration purposes; remove in final application
            // jill@harvard.edu/asdfasdf is one of our seed users from e28api/seeds/user.json
            data: {
                name: '',
                email: '',
                password: '',
            },
            errors: null,
            favorites: [],
            registering: false,
            success: false,
            registerShowing: false,
            loginShowing: true,
            loginErrors: null,
            registerErrors: null,
            greeting: null,
            
        };

    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        tracks() {
            return this.$store.state.tracks;
        },
    },
    methods: {
        renderRegister() {
            this.registerShowing = true;
            this.loginShowing = false;
        },
        renderLogin() {
            this.loginShowing = true;
            this.registerShowing = false;
        },
        loadFavorites() {
            if (this.user) {
                axios
                    .get("favorite/query?user_id=" + this.user.id)
                    .then((response) => {
                        this.favorites = response.data.favorite.map(
                            (favorite) => {
                                return this.$store.getters.getTrackById(
                                    favorite.track_id
                                );
                            }
                        );
                    });
            }
        },
        login() {
            this.registering = false;
            if (this.validate()) {
                axios.post("login", this.data).then((response) => {
                    if (response.data.authenticated) {
                        this.$store.commit("setUser", response.data.user);
                        this.success = true;
                        this.loginShowing = false;
                        this.registerShowing = false;
                    } else {
                        this.loginErrors = response.data.errors;
                    }
                });
                if(this.errors) {
                    this.loginErrors = response.data.errors;
                } else {
                    this.success = true;
                }
            }
        },
        register() {
            this.registering = true;
            
            this.greeting = this.data.name;
            if (this.validate()) {
                
                axios.post("register", this.data).then((response) => {
                    if (response.data.authenticated) {
                        this.$store.commit("setUser", response.data.user);
                        this.success = true;
                        this.loginShowing = true;
                        this.registerShowing = false;
                        
                    
                    } else {
                        this.registerErrors = response.data.errors;
                    }
                        
                });
                if(this.errors) {
                    this.loginErrors = response.data.errors;
                } else {
                    this.success = true;
                    this.loginShowing = true;
                    this.registerShowing = false;
                }
            }
        },
        logout() {
            axios.post("logout").then((response) => {
                if (response.data.success) {
                    this.$store.commit("setUser", false);
                    this.success = false;
                    this.data.name = '';
                    this.data.email = '',
                    this.data.password = '';
                }
            });
        },
        validate() {
            let validator = new Validator(this.data, {
                email: 'required|email',
                password:"required|between:6,35|alpha_num",
            });
            if (validator.fails()) {
                this.errors = validator.errors.all();
            } else {
                this.errors = null;
            }
            return validator.passes();
        },
        
    },
    watch: {
        user() {
            this.loadFavorites();
        },
    },
    mounted() {
        this.loadFavorites();
    },
};
</script>


<style scoped>

[v-cloak] {
    display: none;
}

html, body {
    height: 100vh;
}

#account-page {
    height: 100vh;
}


#logo {
    text-align: center;
    
}

#loginForm {
    max-width: 300px;
}

#signupForm {
    position: relative;
    top: -600px;
    max-width: 300px;
}


div.music {
  padding: 20px;
  font-size: 37px;
  position: relative;
  top: -57px;
  left: 18px;
  font-family: 'Monoton', cursive;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0 0 300px rgba(255, 0, 0, 0.404),0 0 30px rgb(255, 72, 0),0 0 6px DarkRed;
  color: rgb(255, 42, 0);
}

div.music p { margin:0; }
#error:hover { text-shadow: 0 0 50px #ffffff,0 0 80px #008000,0 0 6px #0000ff; }
#code:hover { text-shadow: 0 0 3px rgb(255, 72, 0),0 0 40px FireBrick,0 0 8px DarkRed; }
#error {
  color: #fff;
  text-shadow: 0 0 80px #ffffff,0 0 30px #008000,0 0 6px #0000ff;
}
#error span {
  animation: upper 11s linear infinite;
}
#code span:nth-of-type(2) {
  animation: lower 10s linear infinite;
}
#code span:nth-of-type(1) {
  text-shadow: none;
  opacity:.4;
}
@keyframes upper {
  0%,19.999%,22%,62.999%,64%, 64.999%,70%,100% {
    opacity:.99; text-shadow: 0 0 80px #ffffff,0 0 30px #008000,0 0 6px #0000ff;
  }
  20%,21.999%,63%,63.999%,65%,69.999% {
    opacity:0.4; text-shadow: none; 
  }
}
@keyframes lower {
  0%,12%,18.999%,23%,31.999%,37%,44.999%,46%,49.999%,51%,58.999%,61%,68.999%,71%,85.999%,96%,100% {
    opacity:0.99; text-shadow: 0 0 80px red,0 0 30px FireBrick,0 0 6px DarkRed;
  }
  19%,22.99%,32%,36.999%,45%,45.999%,50%,50.99%,59%,60.999%,69%,70.999%,86%,95.999% { 
    opacity:0.4; text-shadow: none; 
  }
}



</style>