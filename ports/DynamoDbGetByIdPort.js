import { getProduct } from "../domains/DynamoDbLogic.js";

export async function getProductPort (productId, currency) {
  try {
    const product = await getProduct(productId, currency);
    return product;
  } catch (err) {
    return err;
  }
};


