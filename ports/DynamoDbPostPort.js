import { insertProduct } from "../domains/DynamoDbLogic.js";

export async function postProductPort(data){
  console.log("2");
    try {
      const product = await insertProduct(data);
      return product;
    } catch (err) {
      return err;
    }
  };
  