const currencyEl_1 = document.getElementById("currency-1");
const currencyEl_2 = document.getElementById("currency-2");
const amountEl_1 = document.getElementById("amount-one");
const amountEl_2 = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");



function calculate() {
    const currency_1 = currencyEl_1.value;
    const currency_2 = currencyEl_2.value;

    fetch(`https://v6.exchangerate-api.com/v6/d3ddc72907a22237671adcf3/latest/${currency_1}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            const rate = data.conversion_rates[currency_2];

            rateEl.innerHTML = `1 ${currency_1} = ${rate} ${currency_2}`;

            amountEl_2.value = (amountEl_1.value * rate).toFixed(2);
        });
}

currencyEl_1.addEventListener("change", calculate);
amountEl_1.addEventListener("input", calculate);
currencyEl_2.addEventListener("change", calculate);
amountEl_2.addEventListener("input", calculate);
swap.addEventListener("click", () => {
    const temp = currencyEl_1.value;
    currencyEl_1.value = currencyEl_2.value;
    currencyEl_2.value = temp;
    calculate();
})

calculate();