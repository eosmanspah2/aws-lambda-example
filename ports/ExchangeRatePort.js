import { getExchangeRateValue } from "../adapters/ExchangeRateAdapter.js";

export async function getExchangeRate (currency) {
    console.log("Usli u port");
    try {
        const rate = await getExchangeRateValue(currency);
        return rate;
      } catch (err) {
        return err;
      }
}