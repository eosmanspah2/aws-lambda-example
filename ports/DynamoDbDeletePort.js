import { deleteProduct } from "../domains/DynamoDbLogic.js";

export const deleteProductPort = async (productId) => {
  try {
   
    const deletedProduct = await deleteProduct(productId);
    return deletedProduct;
  } catch (err) {
    return err;
  }
};


