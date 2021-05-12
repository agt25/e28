<template>
	<div id='liked-page-container'>
    <div id='liked-page' class="content row justify-content-center">

        <!-- 'Likes' displays all the tracks the user likes -->

        <!-- Logo -->
        <div class="btn-vintage active">
            <span>L</span>
        </div>
        <div class="btn-vintage">
            <span>I</span>
        </div>
        <div class="btn-vintage">
            <span>K</span>
        </div>
        <div class="btn-vintage">
            <span>E</span>
        </div>
        <div class="btn-vintage">
            <span>S</span>
        </div>
    </div>

    <!-- Calls the 'LikedTrackDisplay' component to display each liked track -->
    <div>
        <p id='likes-intro'>Tracks you like</p>
        <div class='container-fluid display'>
            <div class='row is-justify-content-space-around'>
                <div
                    class='col-6 col-md-4 col-lg-3'
                    v-for="track in favorites"
                    v-bind:key='track.id'
                    >
                    <liked-track-display v-bind:track="track"></liked-track-display>
                </div>
            </div>
        </div>

    </div>
	</div>
</template>


<script>
import LikedTrackDisplay from '../LikedTrackDisplay.vue';
import { axios } from "@/common/app.js";


export default {
	components: {
        "liked-track-display": LikedTrackDisplay,
    },
    props: {
		
    },
	emits: ["favorite"],
    data() {
        return {
             favorites: [],
        };
    },
	computed: {
        tracks() {
            return this.$store.state.tracks;
        },
		user() {
            return this.$store.state.user;
        },
		faves() {
			return this.loadFavorites();
		}
    },
	mounted(){
		this.loadFavorites();
	},
	methods: {
			loadFavorites() {
            if (this.user) {
				// Get the tracks this user has liked
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
	}
}
</script>



<style scoped>

@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:400,300');

.display {
	margin-bottom: 20rem;
}

body{
	display: flex;
	justify-content: center;
	align-items: center;
	background: #a3b5bd;
    text-align: center;
}

#likes-intro {
	font-size: 1.3rem;
	margin-left: 2.5rem;
	color: teal;
}

.content{
	display: flex;
    text-align: center;

}

#title {
    border: 1px solid red;
    position: relative;
    width: 100px;
}

#liked-page-container {
	height: 100vh;
}

.btn-vintage{
	display: block;
	text-align:center;
	margin: 1.8rem 10px;
	height: 55px;
	width: 50px;
	line-height: 50px; 
	background: #221e25;
	color: #FDFBDA;
	border: 3px solid #eaca6e;
	border-radius: 50%;
	font-size: 2rem;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	box-shadow: 
		inset -3px -3px 3px -2px #ffedad, 
		1px 1px 1px 2px #73604c, 
		inset 1px 1px 4px 2px #73604c, 
		-1px -1px 0px 0px #ffedad, 
		1px 2px 6px 4px rgba(20, 20, 20, 0.7), 
		inset 2px 2px 6px 6px #000000;
	transition: all .07s linear;
	color: #ff3333;

	span{
		background-color: #630000;
		color: transparent;
		text-shadow: 1px 1px 1px #ff6666;
		-webkit-background-clip: text;
		-moz-background-clip: text;
		background-clip: text;
	}
	&:hover{

	}	
	&:active, &.active{
		box-shadow: 
			inset -3px -3px 3px -2px #ffedad, 
			1px 1px 1px 2px #73604c, 
			inset 1px 1px 4px 2px #73604c, 
			-1px -1px 0px 0px #ffedad, 
			0px 0px 2px 4px rgba(20, 20, 20, 0.7), 
			inset 4px 4px 6px 6px #000000;
		span{
			background-color: #ffffff;
			color: transparent;
			text-shadow: -1px -1px 15px #ff3333;
		}
	}
}


</style>