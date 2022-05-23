import { getProducts } from "../domains/DynamoDbLogic.js";

export const getProductsPort = async () => {
    try {
      console.log("Ulazim u get 3");
      const products = await getProducts();
      return products;
    } catch (err) {
      return err;
    }
  };