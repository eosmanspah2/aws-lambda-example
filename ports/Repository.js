import { getStockValue } from "../adapters/StocksDB.js";

export async function getStockData (stockID){
  try {
    console.log("getStockData");
    const data = await getStockValue(stockID);
    return data;
  } catch (err) {
    return err;
  }
};
