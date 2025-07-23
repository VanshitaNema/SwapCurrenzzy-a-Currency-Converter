const currencyEl1 = document.getElementById("from");
const currencyEl2 = document.getElementById("to");
const amountEl = document.getElementById("num");
const calculateBtn = document.getElementById("btn");
const resultEl = document.getElementById("ans");

// Fetch currency list and populate dropdowns
async function fetchCurrencies() {
  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();
    const currencyCodes = Object.keys(data.rates);

    currencyCodes.forEach(code => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option1.text = code;
      option2.value = option2.text = code;

      currencyEl1.appendChild(option1);
      currencyEl2.appendChild(option2);
    });

    // Set default selections
    currencyEl1.value = "USD";
    currencyEl2.value = "INR";
  } catch (error) {
    console.error("Failed to fetch currencies:", error);
  }
}

fetchCurrencies();

// Currency conversion calculation
calculateBtn.addEventListener("click", async () => {
  const fromCurrency = currencyEl1.value;
  const toCurrency = currencyEl2.value;
  const amount = parseFloat(amountEl.value);

  if (!amount || amount <= 0) {
    swal("Oops!", "Please enter a valid amount to convert.", "error");
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    resultEl.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    swal("Error", "Could not fetch exchange rates. Please try again later.", "error");
  }
});

// Swap currency dropdowns
function switchText() {
  const temp = currencyEl1.value;
  currencyEl1.value = currencyEl2.value;
  currencyEl2.value = temp;
}
