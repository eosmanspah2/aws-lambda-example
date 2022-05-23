import { getProductsData} from "../ports/DynamoDbRepository.js";
import { getProductData} from "../ports/DynamoDbRepository.js";
import { insertProductData} from "../ports/DynamoDbRepository.js";
import { updateProductData} from "../ports/DynamoDbRepository.js";
import { deleteProductData} from "../ports/DynamoDbRepository.js";


export async function getProducts(){
  try {
    const products = await getProductsData();
    return products;
  } catch (err) {
    return err;
  }
};

export async function getProduct(id){
    try {
      console.log("Ulazim u get 4");
      const product = await getProductData(id);
      return product;
    } catch (err) {
      return err;
    }
};

export async function insertProduct(data){
    try {
      const product = await insertProductData(data);
      return product;
    } catch (err) {
      return err;
    }
};

export async function deleteProduct(id){
    try {
      const product = await deleteProductData(id);
      return product;
    } catch (err) {
      return err;
    }
};

export async function updateProduct(id, newData){
    try {
      const product = await updateProductData(id, newData);
      return product;
    } catch (err) {
      return err;
    }
};
