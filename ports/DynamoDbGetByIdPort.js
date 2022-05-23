import { getProduct } from "../domains/DynamoDbLogic.js";

export async function getProductPort (productId) {
  try {
    
    const product = await getProduct(productId);
    return product;
  } catch (err) {
    return err;
  }
};


