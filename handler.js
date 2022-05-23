import { getStocksRequest } from "./adapters/getStocksRequest.js";
import { getDbInformation } from "./adapters/DynamoDBAdapter.js";


export async function stocksMarket(event){
  let response = null;
  try {
    switch(event.resource){
      
      case "/stock/{StockID}":
        const stockID = event.pathParameters.StockID;
        const stock = await getStocksRequest(stockID);
        return stock;

      case "/dynamoDB/{productID}":
        const productId = event.pathParameters.productID;
       // const queryParametars = event["queryStringParameters"]['currency'];
        //console.log("Query string parametar: "+ queryParametars);
        //const queryValidation = validateCurrencyCode(queryParametar)

        response = await getDbInformation(event,productId);
        //console.log("Response handler: " + response);
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
          body: JSON.stringify({message: "Path doesn't exist!"})
        }
    }
    return response;
  }
 catch (err) {
    return {
      'statusCode' : 502,
      'body': JSON.stringify({message: "Internal server error"})
    } 
  }
};
