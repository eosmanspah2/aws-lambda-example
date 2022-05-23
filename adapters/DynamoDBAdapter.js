import { getProductsPort } from "../ports/DynamoDbGetPort.js";
import { getProductPort } from "../ports/DynamoDbGetByIdPort.js";
import { postProductPort } from "../ports/DynamoDbPostPort.js";
import { updateProductPort } from "../ports/DynamoDbPutPort.js";
import { deleteProductPort } from "../ports/DynamoDbDeletePort.js";

function parametarCheck(currency){
  let response = null;
  const currencies = ["BAM","EUR","USD","GBP","HRK"];
  if(!currencies.includes(currency)){
    response = {
      statusCode: 404,
      body: JSON.stringify({message: "Not a valid currency"})
    }
  }
  else{
    response = true;
  }
   return response;
}

export async function getDbInformation(event, productId){
  let response = null;
  try {
    switch(event.httpMethod){
        case 'GET':
          if(productId == null){
            response = await getProductsPort();
          }
          else{
            const currency = event["queryStringParameters"]['currency'];
            const checkCurrency = parametarCheck(currency);
            if(checkCurrency!=true){
              console.log("response: "+JSON.stringify(checkCurrency));
              return JSON.stringify(checkCurrency);
            }
            console.log("DynamoDBAdapter: "+currency)
            response = await getProductPort(productId,currency);          
          }
          break;
        case 'POST':
            response = await postProductPort(event.body);
            break;
        case 'PUT':
            response = await updateProductPort(productId,event.body);
            break;
        case 'DELETE':
            response = await deleteProductPort(productId);
            break;
        default:
            response = {"StatusCode":404, "error":'404 Not found'};
            break;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
  return response;
};