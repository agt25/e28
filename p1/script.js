const Game = {
    data() {
        return {
            picked: '',
            stocks: [
                { name: 'Apple0',
                  old: '3.2411',
                  latest: '136.91',
                  
                },
                { name: 'Apple1',
                  old: '3.2411',
                  latest: '136.91',
                 
                },
                { name: 'Apple2',
                  old: '3.2411',
                  latest: '136.91',
                  
                },
                { name: 'Apple3',
                  old: '3.2411',
                  latest: '136.91',
                  
                }
            ],
            rounds: [
                { number: '',
                  winner: ''
                }
            ]
         
        };
    },
    methods: {
        reset(number) {
            this.rounds = this.rounds.filter(round => round.number == 0)
            

        },
        stockReturn() {
            
        }
       
    }
}


const app = Vue.createApp(Game).mount('#app');