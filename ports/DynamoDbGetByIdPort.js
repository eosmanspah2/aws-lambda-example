import { getProduct } from "../domains/DynamoDbLogic.js";

export async function getProductPort (productId) {
  try {
    console.log("Ulazim u get 3");
    const product = await getProduct(productId);
    return product;
  } catch (err) {
    return err;
  }
};


