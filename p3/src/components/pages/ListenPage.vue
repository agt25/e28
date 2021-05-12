<template>
    <div id="listen-page">

        <!-- Logo of the home page --> 
        <div id='logo'>
        <img src="../../assets/images/logo.svg"></div>
         <div class='music'>
              <p id="code"><span>CA</span>F<span>E</span></p></div>

       <!-- 
        Container for the front page. Split in two halves.
        Left side contains Mr. Coffee Pod;
        sound effects are the left side of the page 
        -->
        <div class='container-fluid'>
            <div class='row justify-content-center'>
                <div class='col-12 col-md-8 col-lg-6'>

                    <!-- Show Mr. Coffee Pod component --> 
                    <coffee-pod></coffee-pod>
                    </div>
                    
                    <!-- Ambience sounds --> 
                    <div class='col-12 col-md-8 col-lg-6' id='ambience-div'>
                       
                       <!-- Barista sound --> 
                       <div class='row sounds'>
                        <section>
                        <input type='range' min='0' value='0' max='1' step='0.2' id='barista-range' v-on:change='changeBarista' />
                        </section>
                         <span class='ambience-head'>Barista</span>
                         </div>

                        <!-- Hidden audio player for barista sound -->
                        <audio preload="auto" id='barista' controls>
                        <!-- <source src="../../assets/sounds/barista.mp3" type="audio/mpeg"> -->
                         <source src="https://sounds09.s3.us-east-2.amazonaws.com/barista.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.  
                        </audio>


                        <!-- Indoor sound --> 
                        <div class='row sounds'>
                        <section>
                        <input type='range' min='0' value='0' max='1' step='0.25' id='indoor-range' v-on:change='changeIndoor' />
                        </section>
                        <span class='ambience-head' id='ambience-smaller'>Indoor</span>
                        </div>

                        <!-- Hidden audio player for indoor sound -->
                        <audio preload="auto" id='indoor' controls>
                        <source src="https://sounds09.s3.us-east-2.amazonaws.com/indoor.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.  
                        </audio>
                        

                        <!-- Outdoor sound --> 
                        <div class='row sounds'>
                        <section>
                        <input type='range' min='0' value='0' max='1' step='0.25' id='outdoor-range' v-on:change='changeOutdoor' />
                        </section>
                        <span class='ambience-head' id='ambience-smaller'>Outdoor</span>
                        </div>

                        <!-- Hidden audio player for outdoor sound -->
                        <audio preload="auto" id='outdoor' controls>
                        <source src="https://sounds09.s3.us-east-2.amazonaws.com/outdoor.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.  
                        </audio>


                        <!-- Evening sound -->
                        <div class='row sounds'>
                        <section>
                         <input type='range' min='0' value='0' max='1' step='0.25' id='evening-range' v-on:change='changeEvening' />
                        </section>
                        <span class='ambience-head' id='ambience-smaller'>Evening</span>
                        </div>

                        <!-- Hidden audio player for evening sound -->
                        <audio preload="auto" id='evening' controls>
                        <source src="https://sounds09.s3.us-east-2.amazonaws.com/evening.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.  
                        </audio>


                        <!-- Day sound --> 
                        <div class='row sounds'>
                        <section>
                        <input type='range' min='0' value='0' max='1' step='0.25' id='day-range' v-on:change='changeDay' />
                        </section>
                        <span class='ambience-head' id='ambience-smaller'>Day</span>
                        </div>

                        <!-- Hidden audio player for day sound -->
                        <audio preload="auto" id='day' controls>
                        <source src="https://sounds09.s3.us-east-2.amazonaws.com/day.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.  
                        </audio>
                      
                        <!-- Travel sound (non-english background speakers) -->
                        <div class='row sounds'>
                        <section>
                         <input type='range' min='0' value='0' max='1' step='0.25' id='travel-range' v-on:change='changeTravel' />
                        </section>
                        <span class='ambience-head' id='ambience-smaller'>Travel</span>
                        </div>


                        <!-- Hidden audio player for travel sound -->
                        <audio preload="auto" id='travel' controls>
                        <source src="https://sounds09.s3.us-east-2.amazonaws.com/travel.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.  
                        </audio>

                        <!-- Lofi  --> 
                        <div class='row sounds'>
                        <section>
                         <input type='range' min='0' value='0' max='1' step='0.25' id='lofi-range' v-on:change='changeLofi' />
                        </section>
                        <span class='ambience-head' id='ambience-smaller'>Lofi</span>
                        </div>

                        <!-- Hidden audio player for lofi sound -->
                        <audio preload="auto" id='lofi' controls>
                        <source src="https://sounds09.s3.us-east-2.amazonaws.com/lofi.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.  
                        </audio>

                        <!-- All that Jazz --> 
                        <div class='row sounds'>
                        <section>
                        <input type='range' min='0' value='0' max='1' step='0.25' id='jazz-range' v-on:change='changeJazz' />
                        </section>
                        <span class='ambience-head' id='ambience-smaller'>Jazz</span>
                        </div>

                        <!-- Hidden audio player for jazz sound -->
                        <audio preload="auto" id='jazz' controls>
                        <source src="https://sounds09.s3.us-east-2.amazonaws.com/jazz.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.  
                        </audio>
                        
                        <!-- Moody / rainy sound effects for when you're depressed like me.
                        Rain is the best. Rain is underrated. Let us stop hating on rain. -->
                        <div class='row sounds'>
                        <section>
                        <input type='range' min='0' value='0' max='1' step='0.25' id='moody-range' v-on:change='changeMoody' />
                        </section>
                        <span class='ambience-head' id='ambience-smaller'>Moody</span>
                        </div>

                        <!-- Hidden audio player for indoor sound -->
                        <audio preload="auto" id='moody' controls>
                        <source src="https://sounds09.s3.us-east-2.amazonaws.com/moody.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.  
                        </audio>

                       
                    </div>
            </div>
        </div>
    </div>

</template>

<script>


import CoffeePod from '../CoffeePod.vue'


export default {
    components: {
        "coffee-pod": CoffeePod
       
        
    },
    props: {
        
    },

    data() {

        return {
            collapseAbout: false,
           
                
            
        }

    },
    computed: {
        tracks() {
            return this.$store.state.tracks;
        },
        user() {
            return this.$store.state.user;
        },
    },
    mounted() {
      this.loadBarista();
      this.loadIndoor();
      this.loadOutdoor();
      this.loadEvening();
      this.loadDay();
      this.loadTravel();
      this.loadJazz();
      this.loadLofi();
      this.loadMoody();
      
    },
    methods: {
    

        /* 
        The methods below set the volume of all sound effect audio players to 0
        when the component is mounted. I tried using 'muted' on all audio players;
        But, doing so would not allow the range sliders to control the volume
        (unless it was first mantually unmuted). 
        
        For "aesthetic" purposes, I have the players autoplaying
        when mounted, set on mute, and set to display: none.
        So, it is impossible for the user to manually unmute the players.
        Thus, I must have the methods below to set the volume of each player to '0' on load.  


        For better design, I tried to create one method for all the audio players. 
        I gave them all the same class nd used document.querySelectorAll to set each of their volume to 0. 
        But this did not work. On load, all the audio tracks would play at 1. 
        */ 
        loadBarista() {
          let soundEffects = document.querySelector("#barista");
          soundEffects.volume = 0;

        },
        loadIndoor() {
          let soundEffects = document.querySelector("#indoor");
          soundEffects.volume = 0;

        },
        loadOutdoor() {
          let soundEffects = document.querySelector("#outdoor");
          soundEffects.volume = 0;

        },
        loadEvening() {
          let soundEffects = document.querySelector("#evening");
          soundEffects.volume = 0;

        },
        loadDay() {
          let soundEffects = document.querySelector("#day");
          soundEffects.volume = 0;

        },
        loadTravel() {
          let soundEffects = document.querySelector("#travel");
          soundEffects.volume = 0;

        },
        loadJazz() {
          let soundEffects = document.querySelector("#jazz");
          soundEffects.volume = 0;

        },
        loadLofi() {
          let soundEffects = document.querySelector("#lofi");
          soundEffects.volume = 0;

        },
        loadMoody() {
          let soundEffects = document.querySelector("#moody");
          soundEffects.volume = 0;

        },
        showAbout() {
            // Show or unshow about section
            this.collapseAbout = !this.collapseAbout;

        },
        announceFave() {
          /* ListenPage is the parent of the 'CoffeePod' component. 
          When 'CoffeePod' $emits "favorite-changed", this page emits 'favorite'. 
          Once 'App' hears this event, it reloads the updated tracks and the *favorites* array.

          After an hour or two of self-loathing, I figured out that App was not listening to 
          CoffeePod's $emitted message — despite having a v-on action configured on the router. 
          Because of this bug, App.vue was not reloading the 'tracks' and 'favorites' props 
          after an update. 

          Now that ListenPage.vue $emits 'favorite', it works. 
          */ 
          this.$emit('favorite');
        },

        /* 
        The methods below are used to control the audio volume of their corresponding
        audio players based on the current value of the range sliders.

        Since each slider might have a different value, and a user can play various sound effects 
        (at various volume ranges) at the same time, I had to create a method 
        for each audio player. 
        */ 
        changeBarista() {
          
          // Access the barista audio volume and set it to the value of the range slider
          let baristaAudio = document.querySelector("#barista");
          let baristaRange = document.getElementById("barista-range").value;
          if (baristaRange == 0) {
            barista.pause();
          } else {
            barista.play();
          }
          baristaAudio.volume = baristaRange;
         
          
        },
        changeIndoor() {
          
          // Access the indoor audio volume and set it to the value of the range slider
          let indoorAudio = document.querySelector("#indoor");
          let indoorRange = document.getElementById("indoor-range").value;
          if (indoorRange == 0) {
            indoor.pause();
          } else {
            indoor.play();
          }
          indoorAudio.volume = indoorRange;
         
          
        },
        changeOutdoor() {
          
          // Access the outdoor audio volume and set it to the value of the range slider
          let outdoorAudio = document.querySelector("#outdoor");
          let outdoorRange = document.getElementById("outdoor-range").value;
          outdoorAudio.volume = outdoorRange;
          if (outdoorRange == 0) {
            outdoor.pause();
          } else {
            outdoor.play();
          }
         
          
        },
        changeEvening() {
          
          // Access the evening audio volume and set it to the value of the range slider
          let eveningAudio = document.querySelector("#evening");
          let eveningRange = document.getElementById("evening-range").value;
          eveningAudio.volume = eveningRange;
          if (eveningRange == 0) {
            evening.pause();
          } else {
            evening.play();
          }
         
          
        },
        changeDay() {
    
          // Access the day audio volume and set it to the value of the range slider
          let dayAudio = document.querySelector("#day");
          let dayRange = document.getElementById("day-range").value;
          dayAudio.volume = dayRange;
          if (dayRange == 0) {
            day.pause();
          } else {
            day.play();
          }
          
        },
        changeTravel() {
          
          // Access the travel audio volume and set it to the value of the range slider
          let travelAudio = document.querySelector("#travel");
          let travelRange = document.getElementById("travel-range").value;
          travelAudio.volume = travelRange;
          if (travelRange == 0) {
            travel.pause();
          } else {
            travel.play();
          }
         
        },
        changeJazz() {
          
          // Access the jazz audio volume and set it to the value of the range slider
          let jazzAudio = document.querySelector("#jazz");
          let jazzRange = document.getElementById("jazz-range").value;
          jazzAudio.volume = jazzRange;
          if (jazzRange == 0) {
            jazz.pause();
          } else {
            jazz.play();
          }
          
        },
        changeLofi() {

          // Access the lofi audio volume and set it to the value of the range slider
          let lofiAudio = document.querySelector("#lofi");
          let lofiRange = document.getElementById("lofi-range").value;
          lofiAudio.volume = lofiRange;
          if (lofiRange == 0) {
            lofi.pause();
          } else {
            lofi.play();
          }
           
        },
        changeMoody() {

          // Access the moody audio volume and set it to the value of the range slider
          let moodyAudio = document.querySelector("#moody");
          let moodyRange = document.getElementById("moody-range").value;
          moodyAudio.volume = moodyRange;
          if (moodyRange == 0) {
            moody.pause();
          } else {
            moody.play();
          }
          
        }
        
    }

}
</script>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

#listen-page {
  margin-bottom: 10rem;
}

.ambience-head {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem;
    letter-spacing: 0.2rem;
    text-align: right;
    margin: 1rem;
    color: rgba(110, 51, 10, 0.856);
    width: 150px;
    
}

.sounds {
    height: 35px;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-items: center;
}

#ambience-smaller {
    font-size: 1.2rem;
}

#ambience-div {
    padding-top: 3rem;
    
}

audio {
  display: none;
}


section {
  align-self: center;
  width: 15em;
  background-size: 1.75em 1px;
  font: 1em/2 verdana, sans-serif;
  text-align: center;
}

section:nth-of-type(1) {
  height: 2em;
}

section:nth-of-type(2) {
  position: relative;
  height: 10em;
}
section:nth-of-type(2):before {
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 3em;
  transform: translate(-50%, 50%) rotate(90deg) translate(-70%);
  color: #676672;
  font-size: .8em;
  font-weight: 600;
  line-height: 8.75;
  text-align: right;
  text-indent: -.25em;
  text-shadow: 0 -1px rgb(185, 99, 99);
  content: '+12dB 0dB -12dB';
}


input[type='range'] {
  display: block;
  margin: 0 auto;
  border: none;
  padding: 0;
  width: 14.5em;
  height: 2em;
  background: transparent;
  font: inherit;
  cursor: pointer;
  /* slider components */
}
input[type='range'], input[type='range']::-webkit-slider-runnable-track, input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}

/* Actual fill of the track */
input[type='range']::-webkit-slider-runnable-track {
  border: none;
  height: 0.38em;
  border-radius: 0.25em;
  box-shadow: inset -.125em .125em .125em #8a6747,  inset 1px -1px 1px #972e2e98;
  background: #f9d7a8a4;
}
input[type='range']::-moz-range-track {
  border: none;
  height: 0.5em;
  border-radius: 0.25em;
  box-shadow: inset -.125em .125em .125em #8b5959,  inset 1px -1px 1px #af8b8b;
  background: #23292f;
}
input[type='range']::-ms-track {
  border: none;
  height: 0.5em;
  border-radius: 0.25em;
  box-shadow: inset -.125em .125em .125em #886767,  inset 1px -1px 1px #4a4a4a;
  background: #23292f;
  color: transparent;
}
input[type='range']::-ms-fill-lower, input[type='range']::-ms-fill-upper, input[type='range']::-ms-tooltip {
  display: none;
}
input[type='range']::-webkit-slider-thumb {
  margin-top: -0.5em;
  border: none;
  width: 1.2em;
  height: 1.2em;
  border-radius: 50%;
  background: radial-gradient(at 80% 50%, #777777, rgba(119, 119, 119, 0) 70%) no-repeat 100% 50%, radial-gradient(at 50% 50%, #777777, rgba(119, 119, 119, 0) 70%) no-repeat -65% 90%, radial-gradient(rgba(255, 255, 255, 0) 32%, #ffffff 35%), linear-gradient(90deg, #f0984d, #bf7145) no-repeat 50% 50%;
  background-size: 35% 65%, 65% 65%, 100% 100%, 65% 65%;
}
input[type='range']::-moz-range-thumb {
  border: none;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: radial-gradient(at 80% 50%, #777777, rgba(119, 119, 119, 0) 70%) no-repeat 100% 50%, radial-gradient(at 50% 50%, #777777, rgba(119, 119, 119, 0) 70%) no-repeat -65% 90%, radial-gradient(rgba(255, 255, 255, 0) 32%, #ffffff 35%), linear-gradient(90deg, #f0984d, #bf7145) no-repeat 50% 50%;
  background-size: 35% 65%, 65% 65%, 100% 100%, 65% 65%;
}

input[type='range']::-ms-thumb {
  border: none;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: radial-gradient(at 80% 50%, #777777, rgba(201, 150, 150, 0) 70%) no-repeat 100% 50%, radial-gradient(at 50% 50%, #777777, rgba(119, 119, 119, 0) 70%) no-repeat -65% 90%, radial-gradient(rgba(255, 255, 255, 0) 32%, #ffffff 35%), linear-gradient(90deg, #f0984d, #bf7145) no-repeat 50% 50%;
  background-size: 35% 65%, 65% 65%, 100% 100%, 65% 65%;
}


input[type='range']:focus {
  outline: none;
  
}

.container-fluid {
    position: relative;
    top: -50px;
}

#logo {
    text-align: center;
    
}

#first-visit {
text-align: center;

}


.aboutBtn {
  width: 100px;
  height: 50px;
  background-size: cover;
  background-color: transparent;
  border: 1px dotted brown;
  position: relative;
  text-align: center;
  left: 160px;
  
  

}

.about-row {
  justify-content: center;
  justify-items: center;
  justify-self: center;
  align-items:  center;
  align-self: center;
  padding: 2rem;
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