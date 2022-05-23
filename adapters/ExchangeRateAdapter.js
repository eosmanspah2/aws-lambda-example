import axios from "axios";


export async function getExchangeRateValue(currency){
    console.log("Usli u adapter");
    let exchangeRates =  await axios.get('https://open.er-api.com/v6/latest/EUR');
    exchangeRates = exchangeRates?.data.rates;
    const exchangeRateValue = exchangeRates[currency];
    console.log("EUR/"+currency+" = "+ exchangeRateValue);
    return exchangeRateValue;
}