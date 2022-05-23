import { getProducts } from "../domains/DynamoDbLogic.js";

export const getProductsPort = async () => {
    try {
      
      const products = await getProducts();
      return products;
    } catch (err) {
      return err;
    }
  };