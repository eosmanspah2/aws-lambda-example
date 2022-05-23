import { insertProduct } from "../domains/DynamoDbLogic.js";

export async function postProductPort(data){
    try {
      const product = await insertProduct(data);
      return product;
    } catch (err) {
      return err;
    }
  };
  