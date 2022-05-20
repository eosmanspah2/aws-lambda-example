import { getStocksRequest } from "./adapters/getStocksRequest.js";
import { getDbInformation } from "./adapters/DynamoDBAdapter.js";


export async function stocksMarket(event){
  let response = null;
  try {
    switch(event.path){

      case "/stock/{StockID}":
        const stockID = event.pathParameters.StockID;
        const stock = await getStocksRequest(stockID);
        console.log("Iz handlera");
        return stock;

      case "/dynamoDB/{productId}":
        const productId = event.pathParameters.productId;
        response = await getDbInformation(event,productId);
        return response;

      case "/dynamoDB/":
        response = await getDbInformation(event,null);
        return response;

      case "/sellableProduct/":
        /*response = {
          statusCode: 200,
          body: JSON.stringify({
            status: 200,
            data: "Prosao sellableProduct"
          });
        return response;*/
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
