const Game = {
    data() {
        return {
            activePlayer: null,
            selectedStock: '',
            startAmount: 10000,
            roundMessage: '',
            todayWorth: null,
            userName: null,
            won: false,
            show: false,
            userPlays: {
                networth: 10000,
                wins: 0,
                losses: 0
            },
            computerPlays: {
                networth: 10000,
                wins: 0,
                losses: 0
            },
            players: [],
            logs: [],
            limit: 6,
            stocks: {
                Apple: {
                    name: 'Apple',
                    symbol: 'AAPL',
                    oldPrice: 3.2411,
                    currentPrice: null
                },
                Microsoft: {
                    name: 'Microsoft',
                    symbol: 'MSFT',
                    oldPrice: 20.3300,
                    currentPrice: null
                },
                PGE: {
                    name: 'PG&E',
                    symbol: 'PCG',
                    oldPrice: 38.8100,
                    currentPrice: null
                },
                Flour: {
                    name: 'Flour',
                    symbol: 'FLR',
                    oldPrice: 47.8900,
                    currentPrice: null
                },
                FirstSolar: {
                    name: 'FirstSolar',
                    symbol: 'FSLR',
                    oldPrice: 151.500,
                    currentPrice: null
                },
                Tesla: {
                    name: 'Tesla 2010',
                    symbol: 'TSLA',
                    oldPrice: 4.7780,
                    currentPrice: null
                },
                Netflix: {
                    name: 'Netflix',
                    symbol: 'NFLX',
                    oldPrice: 4.2671,
                    currentPrice: null
                },
                TransOcean: {
                    name: 'TransOcean',
                    symbol: 'RIG',
                    oldPrice: 52.0100,
                    currentPrice: null
                },
                Amazon: {
                    name: 'Amazon',
                    symbol: 'AMZN',
                    oldPrice: 54.3600,
                    currentPrice: null
                },
                MurphyOil: {
                    name: 'MurphyOil',
                    symbol: 'MUR',
                    oldPrice: 47.4500,
                    currentPrice: null
                },
                Target: {
                    name: 'Target',
                    symbol: 'TGT',
                    oldPrice: 34.6300,
                    currentPrice: null
                },
                Target2: {
                    name: 'Target2',
                    symbol: 'TGT',
                    oldPrice: 34.6300,
                    currentPrice: null
                }
            },
            displayedStocks: [],
            gameRound: 1,
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
            return this.userName;
        }
    },
    created() {
        this.loadStocks();
        this.limitDisplay();
        this.computerSelects();

    },
    methods: {
        newUsers() {
            var user = {
                name: this.userName,
                networth: 10000,
                won: 0,
                lost: 0
            };
            this.players.push(user);

            var computer = {
                name: 'Computer',
                networth: 10000,
                won: 0,
                lost: 0
            };
            this.players.push(computer);
            this.currentPlayer();

        },
        currentPlayer() {
            if (this.gameRound % 2 == 0) {
                this.activePlayer = this.players[1];

            } else {
                this.activePlayer = this.players[0];
            }
            
        },
        computerSelects() {

            /* Select a random stock from the ones displaying */

            let keys = Object.keys(this.displayedStocks);
            let randomIndex = keys[Math.floor(Math.random() * keys.length)];
            let comp = this.displayedStocks[randomIndex];
            console.log(comp);
            return comp;

        },
        randomStock() {

            /* Select a random stock from the list of stocks.
            To be used by limitDisplay() and computerSelects() */

            let keys = Object.keys(this.stocks);
            let randomIndex = keys[Math.floor(Math.random() * keys.length)];
            let item = this.stocks[randomIndex];
            return item;

        },
        limitDisplay() {

            /* Displays 6 random stocks by calling randomStock().
            Pushes the results into an array */

            // Clear the array each call
            this.displayedStocks = [];

            // Make the calls to randomStock
            for (i = 0; i < 6; i++) {
                this
                    .displayedStocks
                    .push(this.randomStock());

            };
            this.currentPlayer();

        },
        loadStocks() {

            // Get the current (latest) price of every stock in 'stocks' Save the API key
            let apiKey = 'c1blnrf48v6sp0s4v640';

            Object
                .values(this.stocks)
                .forEach(stock => {
                    fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${apiKey}`)
                        .then(
                            response => response.json()
                        )
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
            this.limitDisplay();
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
            let oldBalance = this.activePlayer.networth;
            let sharesOwned = oldBalance / stock.oldPrice; 
            

            // Calculate new networth 
            let newBalance = stock.currentPrice * sharesOwned;
            newBalance = newBalance.toFixed(0);

            
           

            this.activePlayer.networth = newBalance;

            // Calculate change / roi 
            let roi = newBalance - oldBalance; 
            console.log(roi);
        



            // let sharesOwned = this.startAmount / stock.oldPrice; 
            // let todaysWorth = stock.currentPrice *
            // sharesOwned; todaysWorth = todaysWorth.toFixed(0); this.todayWorth =
            // todaysWorth

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
                        winner: this.activePlayer,
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
            this.shuffle();
        }
    }
}

const app = Vue.createApp(Game)
app.mount('#app');