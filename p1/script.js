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
            symbols: {
                Apple: {
                    name: 'Apple',
                    symbol: 'AAPL',
                    oldPrice: 3.2411,
                    currentPrice: null,
                },
                Microsoft: {
                    name: 'Microsoft',
                    symbol: 'MSFT',
                    oldPrice: 20.3300,
                    currentPrice: null,
                },
                PGE: {
                    name: 'PG&E',
                    symbol: 'PCG',
                    oldPrice: 38.8100,
                    currentPrice: null,
                },
                Flour: {
                    name: 'Flour',
                    symbol: 'FLR',
                    oldPrice: 47.8900,
                    currentPrice: null,
                },
                FirstSolar: {
                    name: 'FirstSolar',
                    symbol: 'FSLR',
                    oldPrice: 151.500,
                    currentPrice: null,
                },
                Tesla: {
                    name: 'Tesla 2010',
                    symbol: 'TSLA',
                    oldPrice: 4.7780,
                    currentPrice: null,
                },
                Netflix: {
                    name: 'Netflix',
                    symbol: 'NFLX',
                    oldPrice: 4.2671,
                    currentPrice: null,
                },
                TransOcean: {
                    name: 'TransOcean',
                    symbol: 'RIG',
                    oldPrice: 52.0100,
                    currentPrice: null,
                },
                Amazon: {
                    name: 'Amazon',
                    symbol: 'AMZN',
                    oldPrice: 54.3600,
                    currentPrice: null,
                },
                MurphyOil: {
                    name: 'MurphyOil',
                    symbol: 'MUR',
                    oldPrice: 47.4500,
                    currentPrice: null,
                },
                Target: {
                    name: 'Target',
                    symbol: 'TGT',
                    oldPrice: 34.6300,
                    currentPrice: null,
                },
                Target2: {
                    name: 'Target2',
                    symbol: 'TGT',
                    oldPrice: 34.6300,
                    currentPrice: null,
                },

            },

            tested: '',
            computerPlays: {
                wins: 0,
                losses: 0
            },
            test: {},
            gameRound: 1,
            stocks: [
                
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

            // Display the current user playing
            return this.activeUser;
        }
    },
    created() {
        this.loadStocks();

    },
    methods: {
        loadStocks() {
            
            let apiKey = 'c1blnrf48v6sp0s4v640';
            // Get the current (latest) price of every stock in 'stocks'
            Object
                .values(this.symbols)
                .forEach(stock => {
                    fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${apiKey}`)
                    .then(response => response.json())
                    .then(data => {
                        stock.currentPrice = data.c;
                    })
                });
        },
        formatPrice(value) {

            // Format user's networth as dollar currency
            let formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            return formatter.format(value);
        },
        shuffle() {

            // Suffle the stocks displayed
            this.stocks = _.shuffle(this.stocks);
        },
        resetGame() {

            // Reset all game stats 
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