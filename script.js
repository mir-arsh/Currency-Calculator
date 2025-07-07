const countryCodesURL = "https://api.frankfurter.app/latest?";
const dropdownCountries = document.querySelectorAll("select");
const button = document.querySelector("button");
const fromCurrency = document.querySelector(".fromCurrency");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg-container");

// Populate dropdowns with country codes and flags
for (let select of dropdownCountries) {
    for (let countryCode in countryCodes) {
        let option = document.createElement("option");
        option.innerText = countryCode;
        option.value = countryCode;

        if (select.name === "from" && countryCode === "USD") {
            option.selected = "selected";
        } else if (select.name === "to" && countryCode === "INR") {
            option.selected = "selected";
        }

        select.append(option);
        select.addEventListener("change", (event) => {
            updateFlag(event.target);
        });
    }
}

// Update flag when currency changes
const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryCodes[currencyCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Main logic on button click
button.addEventListener("click", async (event) => {
    event.preventDefault();

    const amountInput = document.querySelector("input");
    const amount = amountInput.value;
    const alert = document.querySelector(".alert");
    const container = document.querySelector(".container");
    const sameContainer = document.querySelector(".same-container");

    // Validate amount
    if (amount === "" || amount < 1) {
        alert.style.display = "block";
        msg.innerText = "---";
        return;
    } else {
        alert.style.display = "none";
    }

    // Fetch and display conversion
    try {
        const mainURL = `${countryCodesURL}from=${fromCurrency.value}&to=${toCurrency.value}`;
        let response = await fetch(mainURL);
        let data = await response.json();
        let rate = data.rates[toCurrency.value];
        let finalAmount = amount * rate;

        msg.innerText = `${amount} ${fromCurrency.value} = ${finalAmount.toFixed(2)} ${toCurrency.value}`;
    } catch (error) {
        msg.innerText = "Something went wrong. Try again.";
        console.error("Error fetching exchange rate:", error);
    }
});