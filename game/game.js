// Starting investment amount
const startAmount = 10000;

// Set up variables of selected stock's price, old and new
let stockName;
let oldCost;
let newCost;

// Set up counter variables
let wins = 0;
let losses = 0;
let winDiv = document.querySelector('.win');
let lossDiv = document.querySelector('.loss');

winDiv.innerHTML = wins;
lossDiv.innerHTML = losses;

// Guide button gives game instructions when clicked
let manBtn = document.getElementById('manualBtn');
manualBtn.addEventListener('click', manual);

function manual() {
    let howTo = document.getElementById("manual");

    if (howTo.style.display === "none") {
        howTo.style.display = "block";
        manBtn.innerHTML = 'Close';
    } else {
        howTo.style.display = "none";
        manBtn.innerHTML = 'Guide';
    }
}

// Shuffle the stock placements on page
function shuffle() {

    let parent = document.querySelector(".container-fluid .row");
    for (var i = 0; i < parent.children.length; i++) {
        parent.appendChild(parent.children[Math.random() * i | 0]);
    }
}

/* GAME FUNCTIONALITY SUMMARY
   1. When the 'invest' button is clicked,
   del() deletes previous winner/loser messages.
   2. worth() calculates losses or wins
   3. worth() determines win or lose message
   4. worth() unchecks user's selection after 1/2 a sec
   5. shuffle() re-arranges the stock options
*/

// Invest 10,000 button triggers the game
checkBtn.addEventListener('click', del);

// After any previous messages are deleted, recalculate winner or loser
function del() {
    document.getElementById('end').style.display = 'none';
    let oldMsg = document.getElementById('msgBlock');
    oldMsg.remove();
    worth();
}

/* Worth calculates if user is a winner or loser based on
their stock's return from 
opening day 2009 to February 9, 2021.
 */
function worth() {

    // Save the checkbox option the user checked
    let checkbox = document.querySelectorAll('input[type=checkbox]:checked');

    /* Get the selected stock's name,
    its old cost,
    and its new cost */
    for (let i = 0; i < checkbox.length; i++) {
        stockName = checkbox[i].id;
        oldCost = checkbox[i].value;
        newCost = checkbox[i].name;
    }

    // How much did the stock change?
    let shareChange = newCost - oldCost;
    let sharesOwned = startAmount / oldCost;

    // Today's networth
    let todayWorth = newCost * sharesOwned;
    todayWorth = Math.round(todayWorth);
    finalAmount = todayWorth.toLocaleString();

    // End message
    let totalMsg = `Today you'd be worth $${finalAmount} 
    had you invested in ${stockName}.<br>`

    // Select the div that will contain the message
    let resultMsg = document.createElement('div');
    resultMsg.id = 'msgBlock';
    resultMsg.className = 'msgDiv';
    document
        .getElementsByTagName('body')[0]
        .appendChild(resultMsg);

    // Create a new div
    let newDiv = document.createElement('div');
    newDiv.className = 'response';
    newDiv.id = 'result';

    // Append custom winner or loser message
    resultMsg.appendChild(newDiv);
    winDiv.innerHTML = wins;
    lossDiv.innerHTML = losses;

    // Ultimate game won or game over message
    endMsg = document.getElementById('end');

    // If user is worth more today than the start amount, they won!
    if (todayWorth > startAmount) {
        resultMsg.style.color = 'green';
        resultMsg.innerHTML = `Winner! ${totalMsg}`;
        wins++;
        winDiv.innerHTML = wins;

        // If user has won five times, they win the game
        if (wins === 5) {
            endMsg.style.display = 'block';
            endMsg.innerHTML = '<h3>You won the game!</h3>';
        }

    // User has lost money
    } else {
        resultMsg.style.color = 'red';
        resultMsg.innerHTML = `Loser! ${totalMsg}`;
        losses++;
        lossDiv.innerHTML = losses;

        // If user has lost five times, game over
        if (losses === 5) {
            endMsg.style.display = 'block';
            endMsg.innerHTML = '<h3>Game Over :( </h3>';
        }
    }

    // Reset counters after 3 seconds of a win or loss
    if (wins === 5 || losses === 5) {
        setTimeout(function () {
            wins = 0;
            losses = 0;
            winDiv.innerHTML = wins;
            lossDiv.innerHTML = losses;
        }, 3000);
    }

    // After half a second, uncheck the checked stock
    setTimeout(function () {
        document
            .getElementById(stockName)
            .checked = false;
    }, 500);
    setTimeout(function () {
        shuffle();
    }, 1000);

}
