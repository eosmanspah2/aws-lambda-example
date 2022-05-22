import { getStocksRequest } from "./adapters/getStocksRequest.js";
import { getDbInformation } from "./adapters/DynamoDBAdapter.js";


export async function stocksMarket(event){
  let response = null;
  try {
    console.log("DOBRO JEEEE");
    switch(event.path){
      
      case "/stock/{StockID}":
        const stockID = event.pathParameters.StockID;
        const stock = await getStocksRequest(stockID);
        return stock;

      case "/dynamoDB/{productID}":
        const productId = event.pathParameters.productId;
        response = await getDbInformation(event,productId);
        return response;

      case "/dynamoDB/":
        response = await getDbInformation(event,null);
        return response;

      case "/sellableProduct/":
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
