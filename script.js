const rateKey = "74df2cbfe4d90f1937a33e19";
const restKey = "rc_live_b0cf1ea2c9e9488a95c4e1ec47632267";

const inputAmt = document.querySelector("#input-amt");
const convertBtn = document.querySelector("#convert");
const result = document.querySelector("#result");
const fromCurrency = document.querySelector("#from-curr");
const toCurrency = document.querySelector("#to-curr");
const fromFlag = document.querySelector("#from-flag");
const toFlag = document.querySelector("#to-flag");

const flagUrl = {};


const loadCountries = async () => {
  let offset = 0;
  let hasMore = true;
  const allCountries = [];

  while (hasMore) {
    const url = `https://api.restcountries.com/countries/v5?limit=100&offset=${offset}&response_fields=names.common,currencies,flag.url_svg`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${restKey}` }
    });

    const data = await res.json();
    allCountries.push(...(data.data.objects || []));

    hasMore = data.data.meta.more;
    offset += 100;
  }

  return allCountries;
};

const updateFlags = () => {
  if (fromFlag) fromFlag.src = flagUrl[fromCurrency.value] || "";
  if (toFlag) toFlag.src = flagUrl[toCurrency.value] || "";
};


const convertCurrency = async () => {
  
  const amt = Number(inputAmt.value || inputAmt.placeholder);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  result.innerText = "Converting...";

  const urlExchangeRate = `https://v6.exchangerate-api.com/v6/${rateKey}/pair/${from}/${to}`;
  const res = await fetch(urlExchangeRate);
  const data = await res.json();

  const total = (amt * data.conversion_rate).toFixed(2);
  result.innerText = `${amt} ${from} = ${total} ${to}`;
};


fromCurrency.addEventListener("change", updateFlags);
toCurrency.addEventListener("change", updateFlags);
convertBtn.addEventListener("click", convertCurrency);


const run = async ()=> {
  const countries = await loadCountries();
}

run()