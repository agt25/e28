const App = {
    data() {
        return {
            rounds: [
                { number: 1, winner: 'Player', coin: 'heads', choice: 'heads' },
                { number: 2, winner: 'Computer', coin: 'tails', choice: 'heads' },
                { number: 3, winner: 'Computer', coin: 'heads', choice: 'tails' },
                { number: 4, winner: 'Player', coin: 'tails', choice: 'tails' },
            ]
        }
    },
    methods: {
        deleteRound(number) {
            this.rounds = this.rounds.filter(round => round.number != number);
        }
    }
}



// Root Vue instance
const app = Vue.createApp(App)
app.component('round-detail', RoundDetail);
app.mount('#app');