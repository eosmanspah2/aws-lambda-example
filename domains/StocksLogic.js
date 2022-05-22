import { getStockData } from "../ports/Repository.js";

export async function retrieveStockValues (stockID){
  try {
    console.log("Stocks logic");
    const stockValue = await getStockData(stockID);
    return stockValue;
  } catch (err) {
    return err;
  }
};


