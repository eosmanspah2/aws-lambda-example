import { getProductsData} from "../ports/DynamoDbRepository.js";
import { getProductData} from "../ports/DynamoDbRepository.js";
import { insertProductData} from "../ports/DynamoDbRepository.js";
import { updateProductData} from "../ports/DynamoDbRepository.js";
import { deleteProductData} from "../ports/DynamoDbRepository.js";
import { getExchangeRate } from "../ports/ExchangeRatePort.js";

export async function getProducts(){
  try {
   
    const products = await getProductsData();
    return products;
  } catch (err) {
    return err;
  }
};

export async function getProduct(id,currency){
    try {
      console.log("Domain");
      let rate = 1;
      const product = await getProductData(id);
      if(currency != 'EUR' && product.statusCode == 200 && currency != null){
        rate = await getExchangeRate(currency);
        console.log("DB logic: "+rate * product.body.price);
        product.body.price = product.body.price * rate;
        product.body["currency"] = currency;
      }
      else{
        product.body["currency"] = 'EUR';
      }
      product.body = JSON.stringify(product.body);
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
