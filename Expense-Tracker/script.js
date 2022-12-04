const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransations=[
//     {id:1,text:'salary',amount:400},
//     {id:2,text:'books',amount:-50},
//     {id:3,text:'paper',amount:20},
//     {id:4,text:'food',amount:-100},
// ];

const localStorageTransations = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null ? 
localStorageTransations : [];


// add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() == "" || amount.value.trim() == "") {
        alert("please add a text and amount");
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();

        updateLocalStorage();

        text.value = "";
        amount.value = "";
    }
}

// generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}


// Add transaction to DOM
function addTransactionDOM(transaction) {
    // get sign
    const sign = transaction.amount < 0 ? "-" : "+";

    const item = document.createElement("li");

    // add class based on sign
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// update balance income and Expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = (
        amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1)
        .toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}


// remove transaction by id
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

// update local localStorage
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = "";

    transactions.forEach(addTransactionDOM);
    updateValues();

}

init();

form.addEventListener("submit", addTransaction);