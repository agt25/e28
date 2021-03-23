const Game = {
    data() {
        return {
            playing: '',
            activePlayer: null,
            selected: false,
            gameStarted: false,
            startAmount: 10000,
            roundMessage: '',
            isActive: false,
            userName: null,
            won: false,
            gameOver: false,
            userWins: false,
            show: false,
            guide: false,
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

        },
        displayMessage() {

            // Display whether the user is a winner or loser
            return this.roundMessage;
        },
        displayPrevious() {
            if (this.selected) {
                let last = this.rounds[this.rounds.length - 1];
                return last;
            }

        }
    },
    created() {
        
        this.loadStocks();
        this.limitDisplay();

    },
    methods: {
        lastRound() {
            // let last = this.rounds[this.rounds.length - 1];
            // return last;
            

        },
        newUsers() {
            /* Register a new user and computer object */
            players = [];

            // The game has started
            this.gameStarted = true;

            // 
            this.gameOver = false;
            this.userWins = false;

            // Save the enter userName as the name of the user
            var user = {
                name: this.userName,
                networth: 0,
                showNet: null,
                lastStock: null,
                lastChange: 0,
                showChange: null,
                won: 0,
                lost: 0
            };
            this
                .players
                .push(user);

            var computer = {
                name: 'Computer',
                networth: 0,
                showNet: null,
                lastStock: null,
                lastChange: 0,
                showChange: null,
                won: 0,
                lost: 0
            };
            this
                .players
                .push(computer);
            this.currentPlayer();

        },
        currentPlayer() {

            /* Switch active players,
            based on whether the round is even or odd */

            
            if (this.gameRound % 2 == 0) {

                setTimeout(function () {
                   this.playing = "Computer's turn";
                this.activePlayer = this.players[1];
                setTimeout(function () {
                   this.$refs.submitStock.click();
                }.bind(this), 1500)
                }.bind(this), 1500)
                // If round is even, the computer plays
                
    
                // Selects a random stock from those on the page
                
                
            } else {
    
                // If round is odd, it's the user's turn
                this.playing = "Your turn";
                this.activePlayer = this.players[0];
            }

        },

        randomStock() {

            /* Select a random stock from the list of stocks.
            To be used by limitDisplay() */

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

            /* Get the current (latest) price of every stock in 'stocks'.
            Save the API key */

            let apiKey = 'c1blnrf48v6sp0s4v640';

            // For each stock in 'stocks', fetch the current price
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

            // Reset all the rounds data
            this.selected = false;
            this.rounds.splice(0);
            this.gameRound = 1;

            // Empty the players array
            this.players = [];

            // Re-register the user + the computer
            this.newUsers();

        },
        stockReturn(stock) {

            
            
            // Register the last stock user selected 
            this.activePlayer.lastStock = stock.name;

            // Save the user's old networth
            let oldNet = this.activePlayer.networth;
            

            // Check how many shares the user bought 
            let sharesOwned = 10000 / stock.oldPrice;

            // Calculate total value of the investment 
            let result = stock.currentPrice * sharesOwned;
            result = Math.round(result);

            // Calculate ROI in total dollars
            let change = result - 10000;
            this.activePlayer.lastChange = change;
            

            // ROI in dollar format 
            let formatChange = this.formatPrice(change);
            this.activePlayer.showChange = formatChange;


            // Update the user's total networth after investment 
            newNet = change + oldNet;
            showNet = this.formatPrice(newNet);
            this.activePlayer.networth = newNet;
            this.activePlayer.showNet = showNet; 

            // Get custom round messages based on the investment return
            this.roundResult(stock);

        },
        roundResult(stock) {

            /* Generate Winner or Loser Message */
            if (this.activePlayer.networth >= 40000) {
                if (this.activePlayer.name == 'Computer') {
                    this.gameRound = 1;
                    this.gameOver = true;

                }
                else {
                    this.gameRound = 1;
                    this.userWins = true;
                }
                
            }


            if (this.activePlayer.lastChange > this.startAmount) {

                // User Won
                this.roundMessage = 'Winner';
                this.won = true;
                this.activePlayer.won++;
                this
                    .rounds
                    .push({
                        round: this.gameRound++,
                        player: this.activePlayer.name,
                        result: 'won',
                        stock: stock.name,
                        networth: this.activePlayer.networth,
                        showNet: this.activePlayer.showNet,
                        change: this.activePlayer.lastChange,
                        showChange: `+${this.activePlayer.showChange}`
                    });
            } else if (this.activePlayer.lastChange < this.startAmount) {

                // User lost
                this.won = false;
                this.roundMessage = 'Loser';
                this.activePlayer.lost++;
                this
                    .rounds
                    .push({
                        round: this.gameRound++,
                        player: this.activePlayer.name,
                        result: 'lost',
                        stock: stock.name,
                        networth: this.activePlayer.networth,
                        showNet: this.activePlayer.showNet,
                        change: this.activePlayer.lastChange,
                        showChange: this.activePlayer.showChange
                    });
            } else {

                // The stock did not change
                this.roundMessage = `You did not win or lose anything`;
                this
                    .rounds
                    .push({
                        round: this.gameRound++,
                        player: this.activePlayer.name,
                        result: 'Tie',
                        stock: stock.name,
                        networth: this.activePlayer.networth,
                        change: this.activePlayer.lastChange,
                        showChange: this.activePlayer.showChange
                    });
            }
            this.selected = true;

            // Access this last round 
            this.lastRound();

            // Shuffle the stocks displaying 
            this.shuffle();

            // Check if anyone won the game
            
            
        }
    }
}

const GameLogs = {
    name: 'GameLogs',
    props: {
        round: {
            type: Number, 
        },
        player: {
            type: String
        },
        result: {
            type: String

        },
        change: {
            type: String
        },
        stock: {
            type: String
        },
        networth: {
            type: String
        }
    },
    data() {
        return {

        }
    },
    template: '#game-logs'
}

const app = Vue.createApp(Game)
app.component('game-logs', GameLogs);
app.mount('#app');