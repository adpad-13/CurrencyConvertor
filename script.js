const rateKey = "74df2cbfe4d90f1937a33e19";

const inputAmt = document.querySelector("#input-amt")
const convertBtn = document.querySelector("#convert")
const result = document.querySelector("#result")
const fromCurrency = document.querySelector("#from-curr")
const toCurrency = document.querySelector("#to-curr")

const currencies =  ["USD", "INR", "EUR", "GBP", "CAD", "AUD", "JPY"];

const populateDropdown = () =>{
  fromCurrency.innerHTML = "";
  toCurrency.innerHTML = "";

  currencies.forEach((code) =>{
    fromCurrency.add(new Option(code,code));
    toCurrency.add(new Option(code,code))
  })

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}


const convertUSDtoINR = async ()=>{
  const amt = Number(inputAmt.value)
  const from = fromCurrency.value;
  const to = toCurrency.value;
  result.innerText = "Converting..."

  const url = `https://v6.exchangerate-api.com/v6/${rateKey}/pair/${from}/${to}`;
  const res = await fetch(url);

  const data = await res.json();

  const total = (amt * data.conversion_rate).toFixed(2);
  result.innerText = `${amt} ${from} = ${total} ${to}`;
}
populateDropdown();
convertBtn.addEventListener('click',convertUSDtoINR);