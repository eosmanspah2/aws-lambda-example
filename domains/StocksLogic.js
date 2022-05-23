import { getStockData } from "../ports/Repository.js";

export async function retrieveStockValues (stockID){
  try {
    
    const stockValue = await getStockData(stockID);
    return stockValue;
  } catch (err) {
    return err;
  }
};


