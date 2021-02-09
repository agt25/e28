// Starting investment amount
const startAmount = 10000;

// Set up variables of selected stock's price, old and new
let stockName;
let oldCost;
let newCost;

/* When the button is clicked, run 'worth' —
 checks how much money the user would have
 today, if they had invested 10,000 in their preferred company
 on Jan 1 2000 */
checkBtn.addEventListener('click', worth);

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
    todayWorth = todayWorth.toLocaleString();

    // End message
    let totalMsg = `Today you'd be worth $${todayWorth} 
    had you invested in ${stockName}. <br>`

    // Select the div that will contain the message
    let resultMsg = document.createElement('div');
    resultMsg.id = 'msgBlock';
    resultMsg.className = 'msgDiv';
    document.getElementsByTagName('body')[0].appendChild(resultMsg);

    // Create a new div
    let newDiv = document.createElement('div');
    newDiv.className = 'response';

    // Append the message to the new div
    resultMsg.appendChild(newDiv)
    resultMsg.innerHTML = totalMsg;

    // After 1.5 seconds, uncheck the checkbox
    setTimeout(function () {
        document
            .getElementById(stockName)
            .checked = false;
    }, 1500);

}
