const Game = {
    data() {
        return {
            selectedStock: '',
            startAmount: 10000,
            roundMessage: '',
            todayWorth: '',
            activeUser: '',
            userName: '',
            show: false,
            userPlays: {
                wins: 0,
                losses: 0
            },
            computerPlays: {
                wins: 0,
                losses: 0
            },
            gameRound: 1,
            stocks: [
                {
                    name: 'Apple0',
                    oldPrice: 3.2411,
                    newPrice: 137.00
                }, {
                    name: 'Apple1',
                    oldPrice: 3.2411,
                    newPrice: 143.09
                }, {
                    name: 'Apple2',
                    oldPrice: 3.2411,
                    newPrice: 111.39
                }, {
                    name: 'Apple3',
                    oldPrice: 3.2411,
                    newPrice: 188.29
                }, {
                    name: 'Microsoft',
                    oldPrice: 3.2411,
                    newPrice: 1.05
                }, {
                    name: 'Amazon',
                    oldPrice: 3.2411,
                    newPrice: 3.2411
                }
            ],
            rounds: []
        };
    },
    computed: {
        displayWorth() {
            // Display how much the user would be worth today
            return this.todayWorth;
        },
        displayMessage() {
            // Display whether the user is a winner or loser
            return this.roundMessage;
        },
        displayPlayer() {
            return this.activeUser;
        }

    },
    methods: {
     shuffle() {
      this.stocks = _.shuffle(this.stocks);
    },
    resetGame() {
        this.rounds.splice(0);
        this.gameRound = 1; 
        // Better design opp? into two statements?
        this.userPlays.wins = 0;
        this.userPlays.losses = 0;
        this.computerPlays.wins = 0;
        this.computerPlays.losses = 0;
        this.selectedStock = '';
        
    },
    stockReturn(stock) {

        // Calculcate Stock Return

        let sharesOwned = this.startAmount / stock.oldPrice;
        let todaysWorth = stock.newPrice * sharesOwned;
        todaysWorth = todaysWorth.toFixed(2);
        this.todayWorth = todaysWorth;
        this.shuffle();


    },
    roundResult(stock) {

        // Generate Winner or Loser Message

        if (this.todayWorth > this.startAmount) {
            
            // User Won
            this.roundMessage = 'Winner';
            this.userPlays.wins++;
            this.computerPlays.losses++;
            this.rounds.push({
                round: this.gameRound++,
                winner: this.userName,
                stock: stock.name
            });
        } else if (this.todayWorth < this.startAmount) {

            // Computer Won 
            this.roundMessage = 'Loser';
            this.computerPlays.wins++;
            this.userPlays.losses++;
            this.rounds.push({
                round: this.gameRound++,
                winner: 'Computer',
                stock: stock.name
            });
        } else {
            this.roundMessage = `You did not win or lose anything`;
            this.rounds.push({
                round: this.gameRound++,
                winner: 'Tie',
                stock: stock.name
            });
        }
    }
}
}

const app = Vue.createApp(Game)
app.mount('#app');