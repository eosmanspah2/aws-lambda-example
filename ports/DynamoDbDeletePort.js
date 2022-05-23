import { deleteProduct } from "../domains/DynamoDbLogic.js";

export const deleteProductPort = async (productId) => {
  try {
    console.log("Ulazim u delete 3");
    const deletedProduct = await deleteProduct(productId);
    return deletedProduct;
  } catch (err) {
    return err;
  }
};


