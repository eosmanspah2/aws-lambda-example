import { insertProduct } from "../domains/DynamoDbLogic.js";

export async function postProductPort(data){
    try {
      console.log("Ulazim u post 3");
      const product = await insertProduct(data);
      return product;
    } catch (err) {
      return err;
    }
  };
  