"use strict";

const getStocksRequest = require("./adapters/getStocksRequest");

module.exports.stocksMarket = async (event) => {
  try {
    const stockID = event.pathParameters.StockID;
    const response = await getStocksRequest(stockID);
    console.log("Handler js: " + stockID);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
