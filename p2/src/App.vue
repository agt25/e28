<template>
    <div>
        <!-- Navigation --> 
        <nav class="navbar is-fixed-bottom">
            <div class="navbar-brand flex-container">
                    <router-link class="navbar-item flex-items"
                        v-for="link in links"
                        v-bind:key="link"
                        v-bind:to="paths[link]"
                        >{{ link }}</router-link>
            </div>
        </nav>
          
        <!-- Binding the API track data to router-view so we can use it as props on other pages 
        and trigger re-load based on 'favorite' being emitted by child component -->
        <router-view
            v-bind:tracks="tracks" v-bind:favorites="favorites"
            v-on:favorite="loadTracks"
        ></router-view>
    </div>
</template>



<script>
import { axios } from "@/common/app.js";


export default {
    name: "App",
    emits: ['favorite', 'tracks-loaded'],
    data() {
        return {
            tracks: [],
            received: false,
            favorites: [],

            /* Store links in an array to maintain order */
            links: ["lounge", "likes", "explore"],

            /* Map links to  the appropriate component */
            paths: {
                lounge: "/",
                likes: "/tracks/liked",
                explore: "/tracks/categories",
            },
        };
    },
    mounted() {

        // Load the tracks when the app is mounted 
        this.loadTracks();
    },
    
    computed: {
      getFaves() {

            /* 
            Filters through the tracks property to find all the tracks
            the user likes 
            */
            return this.tracks.filter(function(track){
                return track.liked == 1;
            });
        }
    },
    methods: {
        loadTracks() {

            /* 
            Loads all the tracks from the API 
            via a get request to 'track'
            */ 
            
            axios.get("track").then((response) => {
                this.tracks = response.data.track;
                this.received = true;
                this.$emit('tracks-loaded');
                this.favorites = this.faves();
            });
            this.favorites = this.faves();
           
        },
        faves() {

            /* Returns liked tracks */ 
            return this.tracks.filter(function(track){
                return track.liked == 1;
        });
        },
    },
   
}
</script>



<style>

/* Global CSS styles */

@import "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css";

html, body {
  background-image: url(./assets/images/background.svg);
  background-size: cover;
  background-repeat: no-repeat;
  
}


nav {
  
  background-color: transparent !important;
  color: transparent !important;
  z-index: 100;
  height: 150px;
  background-image: url("./assets/images/last.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 20px;
  
}

.navbar-item {
  letter-spacing: 1px;
  position: relative;
  top: -56px;
  color: rgba(139, 145, 168, 0) !important;
  height: 80px;
  width: 160px;
   
}

.navbar {
  box-shadow: 0px 8px 8px -6px rgba(0,0,0,.5);
}

body {
    font-family: -apple-system-body, BlinkMacSystemFont, sans-serif;
    color: black;
    font-size: 1.3rem;
    color: brown;
}

a {
    color: blue;
}

.headline {
    font-family: -apple-system-headline;
}

.subheadline {
    font-family: -apple-system-subheadline;
}

.footnote {
    font-family: -apple-system-short-footnote;
}

.caption {
    font-family: -apple-system-caption1;
}

.flex-container {
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  
}

.flex-items:nth-child(1) {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
  background-image: url("assets/images/lounge.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  
}

.flex-items:nth-child(2) {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
  background-image: url("assets/images/likes.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  
}

.flex-items:nth-child(3) {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
  background-image: url("assets/images/explore.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  
}

</style>
