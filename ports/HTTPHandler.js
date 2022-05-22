import { retrieveStockValues } from "../domains/StocksLogic.js";

export async function retrieveStock (stockID){
  try {
    const stockWithCurrencies = await retrieveStockValues(stockID);
    return stockWithCurrencies;
  } catch (err) {
    return err;
  }
};


