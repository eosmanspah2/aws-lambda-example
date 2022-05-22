import { retrieveStockValues } from "../domains/StocksLogic.js";

export async function retrieveStock (stockID){
  try {
    console.log("retrieve stock.");
    const stockWithCurrencies = await retrieveStockValues(stockID);
    return stockWithCurrencies;
  } catch (err) {
    return err;
  }
};


