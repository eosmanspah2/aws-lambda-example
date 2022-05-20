import { getProduct } from "../domains/DynamoDbLogic.js";

export const getProductPort = async (productId) => {
  try {
    const product = await getProduct(productId);
    return product;
  } catch (err) {
    return err;
  }
};


