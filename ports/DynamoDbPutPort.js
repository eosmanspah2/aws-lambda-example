import { updateProduct } from "../domains/DynamoDbLogic.js";

export const updateProductPort = async (id,data) => {
    try {
      const product = await updateProduct(id,data);
      return product;
    } catch (err) {
      return err;
    }
  };
  