// Starting investment amount
const startAmount = 10000;

// Set up variables of selected stock's price, old and new
let stockName;
let oldCost;
let newCost;

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

checkBtn.addEventListener('click', del);

// After any previous messages are deleted, call worth()
function del() {
    let oldMsg = document.getElementById('msgBlock');
    oldMsg.remove();
    worth();
}

/*  Calculates if user is a winner or loser based on
their stock's return from opening day 2009 to February 9, 2021.
Worth calls shuffle() */
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
    resultMsg.appendChild(newDiv)

    if (todayWorth > startAmount) {
        resultMsg.style.color = 'green';
        resultMsg.innerHTML = `Winner! ${totalMsg}`;

    } else {
        resultMsg.style.color = 'red';
        resultMsg.innerHTML = `Loser! ${totalMsg}`;
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
