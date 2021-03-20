const Game = {
    data() {
        return {
            selectedStock: '',
            startAmount: 10000,
            roundMessage: '',
            todayWorth: null,
            activeUser: '',
            userName: '',
            won: false,
            show: false,
            userPlays: {
                wins: 0,
                losses: 0
            },
            computerPlays: {
                wins: 0,
                losses: 0
            },
            mysteryImages: [
                '/images/1.jpg', '/images/2.jpg'
            ],
            selectedImage: null,
            gameRound: 1,
            stocks: [
                {
                    name: 'Apple',
                    oldPrice: 3.2411,
                    newPrice: 136.91
                }, {
                    name: 'PG&E',
                    oldPrice: 38.8100,
                    newPrice: 11.84
                }, {
                    name: 'Microsoft',
                    oldPrice: 20.3300,
                    newPrice: 247.47
                }, {
                    name: 'Flour',
                    oldPrice: 47.8900,
                    newPrice: 20.49
                }, {
                    name: 'FirstSolar',
                    oldPrice: 151.500,
                    newPrice: 100.10
                }, {
                    name: 'Tesla, 2010',
                    oldPrice: 4.7780,
                    newPrice: 863.42
                }, {
                    name: 'Netflix',
                    oldPrice: 321.3200,
                    newPrice: 547.92
                }, {
                    name: 'TransOcean',
                    oldPrice: 52.0100,
                    newPrice: 3.64
                }, {
                    name: 'Amazon',
                    oldPrice: 54.3600,
                    newPrice: 3322.94
                }, {
                    name: 'MurphyOil',
                    oldPrice: 47.4500,
                    newPrice: 14.42
                }, {
                    name: 'Target',
                    oldPrice: 34.6300,
                    newPrice: 193.95
                }, {
                    name: 'Target2',
                    oldPrice: 34.6300,
                    newPrice: 193.95
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
        },
        randomImage() {
            this.selectedImage = this.randomItem(this.mysteryImages);

        }

    },
    created() {
        

    },

    methods: {
        randomItem(items) {
            return items[Math.floor(Math.random() * items.length)];
        },
        formatPrice(value) {
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            return formatter.format(value);
        },
        shuffle() {
            this.stocks = _.shuffle(this.stocks);
            this.mysteryImages = _.shuffle(this.mysteryImages)
        },
        resetGame() {
            this
                .rounds
                .splice(0);
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
            todaysWorth = todaysWorth.toFixed(0);
            this.todayWorth = todaysWorth
            this.shuffle();

        },
        roundResult(stock) {

            // Generate Winner or Loser Message

            if (this.todayWorth > this.startAmount) {

                // User Won
                this.roundMessage = 'Winner';
                this.won = true;
                this.userPlays.wins++;
                this.computerPlays.losses++;
                this
                    .rounds
                    .push({
                        round: this.gameRound++,
                        winner: this.userName,
                        stock: stock.name
                    });
            } else if (this.todayWorth < this.startAmount) {

                // Computer Won
                this.won = false;
                this.roundMessage = 'Loser';
                this.computerPlays.wins++;
                this.userPlays.losses++;
                this
                    .rounds
                    .push({
                        round: this.gameRound++,
                        winner: 'Computer',
                        stock: stock.name
                    });
            } else {
                this.roundMessage = `You did not win or lose anything`;
                this
                    .rounds
                    .push({
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