<template>
    
    <!-- This component returns individual cards displaying each liked track -->
    <div id="liked-track-display" class='text-center'>
            <img v-bind:src='imgSrc'/>
            <p class='track-artist'> {{ track.artist }} </p>
            <p class='track-title'> {{ track.title }} </p>
        </div>
        
     
</template>

<script>

export default { 
    props: {
        track: {
            type: Object
        }
    },
    computed: {
        imgSrc() {
            /* 
            Dynamically assign album art based on the track's id;
            Defaults to '1' in the event of an error 
            */ 

            try {
                return require("@/assets/likedTracks/" +
                    this.track.track +
                    ".svg");
            } catch (e) {
                return require("@/assets/likedTracks/1.svg");
            }
        },
    }
}

</script>


<style scoped>

.track-artist {
    font-size: 1rem;
    color: rgb(43, 73, 73);
}

.track-title {
    font-size: 1.3rem;
    color: rgb(131, 78, 5);
}

</style>