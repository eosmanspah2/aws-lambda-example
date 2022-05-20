import { getStockData } from "../ports/Repository.js";

export async function retrieveStockValues (stockID){
  try {
    console.log("4");
    const stockValue = await getStockData(stockID);
    return stockValue;
  } catch (err) {
    return err;
  }
};


