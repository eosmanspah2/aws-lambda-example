import { getProductsPort } from "../ports/DynamoDbGetPort.js";
import { getProductPort } from "../ports/DynamoDbGetByIdPort.js";
import { postProductPort } from "../ports/DynamoDbPostPort.js";
import { updateProductPort } from "../ports/DynamoDbPutPort.js";
import { deleteProductPort } from "../ports/DynamoDbDeletePort.js";

export async function getDbInformation(event, productId){
  let response = null;
  try {
    switch(event.httpMethod){
        case 'GET':
          if(productId == null){
            response = await getProductsPort();
          }
          else{
            response = await getProductPort(productId);          
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