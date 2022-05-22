import { getStocksRequest } from "./adapters/getStocksRequest.js";
import { getDbInformation } from "./adapters/DynamoDBAdapter.js";


export async function stocksMarket(event){
  let response = null;
  console.log("Usao u switch case: "+event.resource);
  try {
    switch(event.resource){
      
      case "/stock/{StockID}":
        console.log("Handler.js");
        const stockID = event.pathParameters.StockID;
        const stock = await getStocksRequest(stockID);
        return stock;

      case "/dynamoDB/{productID}":
        console.log("Ulazim u post 1");
        const productId = event.pathParameters.productID;
        response = await getDbInformation(event,productId);
        return response;

      case "/dynamoDB":
        response = await getDbInformation(event,null);
        return response;

      case "/sellableProduct":
        response = "sellableProduct route";
        return response;
      default:
        response = {
          statusCode: 404,
          error: "404 not found"
        }
    }
    return response;
  }
 catch (err) {
    console.log(err);
    return err;
  }
};
