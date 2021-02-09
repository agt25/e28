// Starting investment amount
const startAmount = 10000;

// Set up variables of selected stock's price, old and new
let stockName;
let oldCost;
let newCost;


// When the 'invest' button is clicked, delete any previous winner/loser messages
checkBtn.addEventListener('click', del);

function del() {
    let oldMsg = document.getElementById('msgBlock');
    oldMsg.remove();
    worth();
}

/* Calculates if user is a winner or loser based on their stock's 
return from opening day 2009 to February 9, 2021 */
function worth() {

    // Save the checkbox option the user checked
    let checkbox = document.querySelectorAll('input[type=checkbox]:checked')

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
    had you invested in ${stockName}. <br>`

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

    // Append custom winner and loser messages
    resultMsg.appendChild(newDiv)

    if (todayWorth > startAmount) {
        resultMsg.style.color = 'green';
        resultMsg.innerHTML = `Winner! ${totalMsg}`;

    } else {
        resultMsg.style.color = 'red';
        resultMsg.innerHTML = `Loser! ${totalMsg}`;
    }

    // After half a second, uncheck the checkbox
    setTimeout(function () {
        document
            .getElementById(stockName)
            .checked = false;
    }, 500);

   
}


