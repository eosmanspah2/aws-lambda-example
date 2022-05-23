import { getProductValue} from "../adapters/ProductsDB.js";
import { getProductsValue} from "../adapters/ProductsDB.js";
import { deleteProductValue} from "../adapters/ProductsDB.js";
import { updateProductValue} from "../adapters/ProductsDB.js";
import { insertProductValue} from "../adapters/ProductsDB.js";

export async function getProductData(id){
  try {
    
    const data = await getProductValue(id);
    return data;
  } catch (err) {
    return err;
  }
};

export async function getProductsData(){
    try {
      
      const data = await getProductsValue();
      return data;
    } catch (err) {
      return err;
    }
  };

  export async function insertProductData(newData){
    try {
      const data = await insertProductValue(newData);
      return data;
    } catch (err) {
      return err;
    }
  };

  export async function updateProductData(id,newData){
    try {
      
      const data = await updateProductValue(id,newData);
      return data;
    } catch (err) {
      return err;
    }
  };

  export async function deleteProductData(id){
    try {
      
      const data = await deleteProductValue(id);
      return data;
    } catch (err) {
      return err;
    }
  };

