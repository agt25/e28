<template>
  <div id='coffee-pod-wrapper' class='container'>
    <!-- 
    This component renders a hidden audio player whose controls are 
    triggered by the buttons on the "iPod". 
    It returns album art and the ability to like / unlike a track. 
    Each like / unlike makes a put request to the API, 
    and emits the event to the parent component so 'App.vue' can re-load
    the track data 
    --> 
    
      <!-- Ensure only the current track is binded -->
      <p v-for="track in currentTrack" v-bind:key="track.id">
               {{ track.title }}
      </p>

    <!-- Mr. CoffeePod, the poor man's neomorphic iPod. I tried. -->
    <div class="wrapper" id="app">
        <div class="player">
            <div class='col-12'>
                <div class="media-controls">
                    <div class="media-buttons">

                        <!-- Previous track buttoon -->
                        <button class="back-button media-button" label="back" v-on:click='previousTrack()'>
                            <i class="button-icons delta"></i>
                            <img class='controls' id="back-btn" src='../assets/images/backIcon.svg'>
                                <span class="button-text milli"></span> 
                            </button>

                            <!-- Play / pause button -->
                            <button class="play-button media-button" label="play" v-on:click='playTrack()'>
                                <i class="button-icons"></i>
                                <span v-if='trackPlaying'>
                                <img id='play-pause-btn' src='../assets/images/pauseIcon.svg'> </span>
                                <span v-if='!trackPlaying'>
                                    <img id='play-pause-btn' src='../assets/images/playIcon.svg'> 
                                    </span>
                                    <span class="button-text milli"></span>
                                </button>

                                <!-- Next track button -->
                                <button class="skip-button media-button" label="skip" v-on:click='nextTrack()'>
                                    <i class="button-icons"></i>
                                    <img class='controls' id="next-btn" src='../assets/images/forwardIcon.svg'>
                                        <span class="button-text milli" v-bind:style="{ color: activeColor}"></span>
                                    </button>

                                </div>

                                <!-- Liked / unliked button  --> 
                                <button class="skip-button media-button" id='like-unlike' label="like">
                                    <i class="button-icons"></i>
                                    
                                   <!-- Heart image depends on whether the track is liked or not liked -->
                                   <div v-if='user'>
                                     <div v-show='currentLiked' v-on:click='likeUnlikeTrack'>
                                       <span class='likeBtn' v-bind:class="heartClass"></span>
                                        
                                       
                                       </div>
                                     <div v-show='!currentLiked' v-on:click='likeUnlikeTrack'>
                                       <span class='likeBtn' v-bind:class="heartClass"></span>
                                     </div>
                                   
                                      </div>
                                        <button class="button-text milli"></button>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Album Cover -->
                    <div id='album-cover'>
                        <img v-bind:src='albumSrc'></div>

                    <!-- Music player (hidden from the user but controled via the iPod buttons-->
                    <audio preload="auto" class='main' id='audio-player' controls>
                    <source v-bind:src="audioSrc" type="audio/mpeg">
                        Your browser does not support the audio element.  
                    </audio>
                    </div>                

</template>

<script>
import { axios } from "@/common/app.js";


export default {
    data() {
        return {
            currentTrackId: 1,
            userLikes: [],
            isTrackPlaying: false,
            activeTrack: [],
            trackPlaying: false,
            imgClicked: false,
            favorites: [],
            isCurrentTrackLiked: false,
            result: [],
            newFave: {
              track_id: null,
              user_id: null
            },
            deleteFaveById: 0,
            currentLiked: false,
            isActive: null,
            activeColor: null,
            heartClass: 'bi bi-suit-heart-fill',
            
            
            
        };
    },
    computed: {
        faveStatus() {
          return this.isLiked();
        },
        
        tracks() {
            return this.$store.state.tracks;
        },
        user() {
            return this.$store.state.user;
        },
        faves() {
			    return this.loadFavorites();
		    },
        
        audioSrc() {
            /* 
            Sets the audio source based on the current track's id 
            */ 

            try {
                /* Hosting tracks on an Amazon S3 instance */
                let a = 1;
                return (`https://track09.s3.us-east-2.amazonaws.com/${this.currentTrackId}.mp3`);
               
            } catch (e) {
                this.currentTrackId = 1;
                this.playTrack();
            }
        },
        albumSrc() {
          /* 
          Sets the album art showing below the iPod 
          based on the current track's id 
          */ 

          try {
            return require("@/assets/albumArt/" +
              this.currentTrackId +
                ".svg");
          } catch (e) {
            return require("@/assets/albumArt/1.svg");
          }
        },
        
        currentTrack() {
          /* 
          Computed property returning the currentTrack currently playing or showing 
          */ 

          return this.tracks.filter((track) => {
                return track.track == this.currentTrackId;
            }, this.currentTrackId);
        }
    },
    mounted(){
      
		  this.loadFavorites();
      this.isLiked();
      
	  },
    methods: {
      isLiked() {
         axios
            .get(`favorite/query?user_id=${this.user.id}&track_id=${this.currentTrackId}`)
            .then((response) => {
                console.log(response);

                /* Check if favorite item that fits the query is returned;
                if yes, proceed to delete that track from the favorites */
                if (response.data.favorite.length != 0) {
                  this.currentLiked = true;
                  this.heartClass = "bi bi-suit-heart-fill";
                 
                } else {
                  this.currentLiked = false;
                  this.heartClass = "bi bi-suit-heart";
                }
            });   
           
        },
      checkFavorites() {
        if (this.user) {
          this.loadFavorites();
        }
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
        playTrack() {
            /* 
            When user clicks on the iPod button, pause or play audio 
            based on its curren state
            */

            let audio = document.getElementById("audio-player");
            if (audio.paused) {
                audio.play();
                this.trackPlaying = true;
            } else {
                audio.pause();
                this.trackPlaying = false;
            }
        },
        likeUnlikeTrack() {
          // Query for the id of the favorite object to be delete 
          axios
            .get(`favorite/query?user_id=${this.user.id}&track_id=${this.currentTrackId}`)
            .then((response) => {
                console.log(response);

                /* Check if favorite item that fits the query is returned;
                if yes, proceed to delete that track from the favorites */
                if (response.data.favorite.length != 0) {
                  this.deleteFaveById = response.data.favorite[0].id;
                  this.heartClass = "bi bi-suit-heart";
                  this.deleteFavoriteTrack(this.deleteFaveById);
                } else {
                  this.heartClass = "bi bi-suit-heart-fill";
                  this.likeTrack();
                }
            });  
        },
        likeTrack() {
          /* 
          Likes the current track by making a put
          request in which the 'liked' property is set to 1
          */
         this.newFave.track_id = this.currentTrackId;
         this.newFave.user_id = this.user.id;
         
         
         
         axios.post("/favorite", this.newFave ).then((response) => {console.log(response)})
         
          
        
        },
        deleteFavoriteTrack(trackId) {

          // Deletes a track by id from the favorites by table 
          axios.delete(`/favorite/${trackId}`)
          .then((response) => {
                console.log(response);
            });
        },
        
        nextTrack() {
          /* 
          Gets the next track object in the props array by incrementing
          the currentTrackId;
          Loads and plays that song.
          */

          this.currentTrackId = this.currentTrackId + 1;
          this.isLiked();
          let audio = document.getElementById("audio-player");
          audio.load();
          audio.play();
          
          
        },
        previousTrack() {
          /* 
          Gets the previous track object in the props array by decrementing
          the currentTrackId;
          Loads and plays that song.
          */

          this.currentTrackId = this.currentTrackId - 1;
          this.isLiked();
          let audio = document.getElementById("audio-player");
          audio.load();
          audio.play();
          
          
        },
        nowPlaying() {

          // Returns the current track object playing 
          return this.tracks.filter((track) => {
                return track.track == this.currentTrackId;
            }, this.currentTrackId);
           
        },     
  },              
}



</script>

<style scoped>

@import url("https://fonts.googleapis.com/css?family=Sacramento&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");

#like-unlike {
  border: 1px solid rgb(3, 65, 65);
  width: 55px;
  height: 55px;
  position: relative;
  top: -50px;
  left: 80px;
  z-index: 10;
    
}

.bi, .bi-suit-heart, .bi-suit-heart-fill {
  font-size: 2.2rem;
  position: relative;
  top: -14px;
  color: rgb(189, 18, 18);
}

audio.main {
  position: relative;
  top: -250px;
  left: 110px;
  width: 250px;
  -moz-border-radius:7px 7px 7px 7px ;
  -webkit-border-radius:7px 7px 7px 7px ;
  border-radius:7px 7px 7px 7px ;

}

audio {
    display: none;
}
audio::-webkit-media-controls-panel {
  background-color: #EFEEE6;
}

audio::-webkit-media-controls-current-time-display{
  color: rgba(0, 128, 128, 0.658);
}

audio::-webkit-media-controls-time-remaining-display{
  color: rgba(0, 128, 128, 0.699);
}

button {
  padding: 0;
}

.controls {
    position: relative;
    top: -35px;
}

#play-pause-btn {
    width: 40px;
    position: relative;
    top: -48px;
    
}

.heartImg {
  position: relative;
  top: -17px;
  
  
}



#like-btn {
    position: relative;
    
}

#not-liked-btn {
  position: relative;
    
}

.media-controls {
  align-items: center;
  background: #fffaee;
  border: 1px solid #fff3eb;
  border-radius: 24px;
  color: #565656;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px;
  max-width: calc(100% - 24px * 2);
  padding: 24px;
  position: relative;
  top: 10px;
}
.media-controls:after {
  border-radius: 24px;
  box-shadow: 0 2px 2px rgba(255, 107, 0, 0.25), 0 4px 4px rgba(255, 107, 0, 0.2), 0 8px 8px rgba(255, 107, 0, 0.15), 0 16px 16px rgba(255, 107, 0, 0.1), 0 24px 24px rgba(255, 107, 0, 0.05);
  content: '';
  height: 100%;
  left: 0;
  mix-blend-mode: multiply;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
}
.media-buttons {
  display: flex;
  flex-wrap: nowrap;
  background: #fffaee8a;
  border-radius: 30px;
  height: 150px;
  position: relative;
  border: none;
 
}
*:focus {
    outline: 0 !important;
}
.media-button {
  background-color: transparent;
  border: none;
  align-items: center;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  top: 15px;
}
@media (min-width: 421px) {
  .media-button {
    padding: 12px;
  }
}
.button-icons {
  background-color: #ffc399;
  border-radius: 100%;
  margin-bottom: 4px;
  margin-top: auto;
  padding: 16px;
}
.back-button .button-icons,
.skip-button .button-icons {
  background-color: transparent;
  color: #919191;
}
.rewind-button .button-icons,
.fast-forward-button .button-icons {
  background: linear-gradient(to bottom left, #fff8e7, #ffe1cc);
  color: #838383;
}
.play-button .button-icons {
  background: linear-gradient(to bottom left, #ffffff, #fff8e7);
  border: 1px solid #fff3eb;
  box-shadow: -1px 1px 1px rgba(255, 195, 153, 0.25), 1px -1px 1px rgba(255, 255, 255, 0.25), -2px 2px 2px rgba(255, 195, 153, 0.2), 2px -2px 2px rgba(255, 255, 255, 0.2), -4px 4px 4px rgba(255, 195, 153, 0.15), 4px -4px 4px rgba(255, 255, 255, 0.15), -8px 8px 8px rgba(255, 195, 153, 0.1), 8px -8px 8px rgba(255, 255, 255, 0.1), -16px 16px 16px rgba(255, 195, 153, 0.05), 16px -16px 16px rgba(255, 255, 255, 0.05);
  color: #f26600;
  margin-bottom: 8px;
  padding: 24px;
  width: 55px;
  top: 4px;
  position: relative;
}

.play-button:hover {
  border: none;
}

.play-button:active {
  border: none;
}

.button-text {
  margin-top: auto;
}

.media-progress {
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.progress-bar-wrapper {
  background-color: transparent;
  border-radius: 12px;
  box-shadow: inset -1px 1px 1px rgba(255, 195, 153, 0.25), inset 1px -1px 1px rgba(255, 255, 255, 0.25), inset -2px 2px 2px rgba(255, 195, 153, 0.2), inset 2px -2px 2px rgba(255, 255, 255, 0.2), inset -4px 4px 4px rgba(255, 195, 153, 0.15), inset 4px -4px 4px rgba(255, 255, 255, 0.15), inset -8px 8px 8px rgba(255, 195, 153, 0.1), inset 8px -8px 8px rgba(255, 255, 255, 0.1), inset -16px 16px 16px rgba(255, 195, 153, 0.05), inset 16px -16px 16px rgba(255, 255, 255, 0.05);
  height: 12px;
  margin-bottom: 8px;
  margin-top: 24px;
  position: relative;
  width: 100%;
}

.progress-bar {
  background: linear-gradient(to right, #fdd25f, #ff6b00);
  border-radius: 12px;
  box-shadow: none;
  height: 12px;
  width: 44%;
}

#album-cover {
    position: relative;
    top: -220px;
    width: 100%;
    z-index: 1;
   
}

#coffee-pod-wrapper {
    width: 500px;
 
}

body {
  background: #dfe7ef;
  font-family: "Bitter", serif;
}

* {
  box-sizing: border-box;
  
}

.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  position: relative;
  top: -30px;

}

.player {
  background:  #ffe1cc10; 
  width: 220px;
  min-height: 250px;
  box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
  border-radius: 15px;
  padding: 30px;

}

.container {
  height: auto;
}


</style>