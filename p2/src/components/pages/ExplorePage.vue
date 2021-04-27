<template>
  <div id='explore' class="container">
      <!-- 
      Page extracts the categories all tracks belong to and showcases each 
      -->
      <div class='music'>

          <!-- Page logo --> 
          <p id="code">M<span>U</span>SI<span>C</span>
          </p>
      </div>

      <!-- Categories header and subheader --> 
      <p id='intro-cat'>Catếgories</p>
      <div class='text-center'>
          <p id='intro-cat-sub'>instrumentals for papers,
              <br>
                  tracks with lyrics for when you code,
                  <br>
                      and foreign to make you feel like you are traveling!</p>
              </div>

              <!-- Contains all the categories --> 
              <div class='row justify-content-center cats'>
                  <div
                      class='col-6 col-md-3 col-lg-3 text-center each-cat'
                      v-for="(category, id) in categories"
                      v-bind:key="id">
                      <img class='cat-images' :src="require(`@/assets/categoryArt/${category}.svg`)"/>
                      <div >
                          {{ category }}
                      </div>
                  </div>
              </div>
          </div>
</template>

<script>


export default {
    components: {
           
    },
    props: {
        tracks: {
            type: Array,
           
        },
        favorites: {
            type: Array,
           
        },
    },

    data() {

        return {
            
            
          }
        },
        computed: {
          categories() {
            /* Extracts the categories found in the backend 
            SOURCE: May have copy / pased this one from Professor Buck's source code */ 

          let categories = this.tracks.map((track) =>
              track.categories.split(",")
          );
          let mergedCategories = [].concat.apply([], categories);

          // Return unique, sorted categories
          return [...new Set(mergedCategories)].sort();
        },

        catImage(category) {

            // Assign the corresponding image for each category 

            let images = require.context('../../assets/categoryArt/', false, /\.svg$/)
            return images('./' + category + '.svg')
        },
            
      }
    }
    

</script>



<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css";

@import url(https://fonts.googleapis.com/css?family=Exo+2:200i);

@import url(https://fonts.googleapis.com/css?family=Monoton); 

@import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap');

.cats {
 
}

.each-cat {
  margin-bottom: 10rem;
}


#intro-cat {
  text-align: center;
  font-size: 2rem;
  font-family: 'Tenor Sans', sans-serif;
}

#intro-cat-sub {
  text-align: center;
  font-size: 1.1rem;
  font-family: 'Tenor Sans', sans-serif;
  line-height: 2rem;
  color: rgba(12, 103, 103, 0.841);
}

.cat-images {
    width: 16rem;
    margin: 2rem;
}

div.music {
  padding: 26px;
  font-size: 75px;
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
body {
  font-family: "Exo 2", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  text-align: center;
 
}


</style>