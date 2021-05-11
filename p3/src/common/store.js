import { createStore, createLogger } from 'vuex';
import { axios } from "@/common/app.js";

// Only load the createLogger plugin when in development mode
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug && 1 == 2 ? [createLogger({})] : [];

export const store = createStore({
    state() {
        return {
            tracks: [],
            user: null,
        }
    },
    // Methods used to alter the state of our store
    mutations: {
        // setCartCount(state, payload) {
        //     state.cartCount = payload;
        // },
        setTracks(state, payload) {
            state.tracks = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        }
    },
    // Methods that can contain async. code
    // Can not directly alter the state - has to change state
    // by committing mutations
    actions: {
        fetchTracks(context) {
            axios.get("track").then((response) => {
                context.commit('setTracks', response.data.track);
            });
        },
        authUser(context) {
            return new Promise((resolve) => {
            axios.post('auth').then((response) => {
                if (response.data.authenticated) {
                    context.commit('setUser', response.data.user);
                } else {
                    context.commit('setUser', false);
                }

                resolve();
            });
        });
    },
    },
    getters: {
        getTrackById(state) {
            return function (id) {
                return state.tracks.filter((track) => {
                    return track.id == id;
                }, id)[0];
            }
        }
    }
})