import { retrieveStock } from "../ports/HTTPHandler.js";

export async function getStocksRequest(stockID){
  let res;

  try {
    console.log("2");
    const stockData = await retrieveStock(stockID);
    res = {
      statusCode: 200,
      body: JSON.stringify({
        status: 200,
        data: stockData
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }
  return res;
};
