<template>
    <div id="about-section">
        <section v-if='!removeAbout'>
        <h2>Welcome to Pandemic Cafe!</h2>
        <div id='tagline'> Here you'll feel as if you're studing in a real cafe.
            <div>Do play around with the ambient sounds.</div>
            <div>And allow us to play you some "study" music....</div>
            <hr>
            <div>After we implement user authentication, <br>
                Mr. CoffeePod will learn from your likes to better personalize your music.<br>
                Until then, please hang <strong><i>out</i></strong> here with us!</div>
            <!-- MAKE BUTTON AN SVG COFFEE BEAN -->
            </div>
        </section>
    </div>      
</template>

<script>
export default {
    
    data() {
        return {
            removeAbout: false,
              
        }
        
    },
    mounted() {
       
        
    },
    methods: {
      
        
        
    }
    
}
</script>


<style scoped>


h2 {
    font-size: larger;

}

body {
    font-size: 1rem;
    border: 1px dotted white;
}

#tagline {
    line-height: 1.8rem;
}


</style>
