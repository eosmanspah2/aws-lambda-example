import aws from "aws-sdk";
import { v4 } from "uuid";

aws.config.update({
    region: "us-east-1"
});

const documentClient = new aws.DynamoDB.DocumentClient();
const dynamoDBTableName = 'osmanspahicProducts';

async function scanDynamoRecords(scanParams, itemArray) {
    try {
      const dynamoData = await documentClient.scan(scanParams).promise();
      itemArray = itemArray.concat(dynamoData.Items);
      if (dynamoData.LastEvaluatedKey) {
        scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
        return await scanDynamoRecords(scanParams, itemArray);
      }
      return itemArray;
    } catch(error) {
      console.error('The error is: ', error);
    }
  }

export const getProductsValue = async () => {
    const params = {
        TableName: dynamoDBTableName
    }
    const allProducts = await scanDynamoRecords(params, []);
    return allProducts;
}

export const getProductValue = async (id) => {
const product = await documentClient.get({
  TableName: dynamoDBTableName,
  Key: {
    id: id,
  }
}).promise();

if(!product.Item){
  return {
    statusCode: 404,
    error: "404 not found"
  }
}
return product.Item;
  
}

const getProductValueHelp = async (id) => {
  const product = await documentClient.get({
    TableName: dynamoDBTableName,
    Key: {
      id: id,
    }
  }).promise();
  
  if(!product.Item){
    return {
      statusCode: 404,
      error: "404 not found"
    }
  }
  return product.Item;
    
  }

  export const insertProductValue = async (requestBody) => {
    
    console.log(requestBody);
    const params = {
      TableName: dynamodbTableName,
      Item: requestBody
    }
    return await documentClient.put(params).promise().then(() => {
      const body = {
        statusCode: 201,
        body: requestBody
      }
      return body;
    }, (error) => {
      console.error('The error is: ', error);
    });
  }

  export const updateProductValue = async (id, requestBody) => {
   try{
    const product2 = await getProductValue(id);

    const product = {
     ...requestBody,
     id: id
   };

   await documentClient.put({
     TableName: dynamoDBTableName,
     Item: product
   }).promise();

   return{
     statusCode: 200,
     body: JSON.stringify(product)
   }
  }catch (e) {
    return e;
  }

  }

  export const deleteProductValue = async (id) => {
    try{
      const product = await getProductValueHelp(id);

      await documentClient.delete({
        TableName: dynamoDBTableName,
        Key: {
          id: id,
        }
      }).promise();

      return {
        statusCode: 204,
        body: JSON.stringify(product)
      };
    }
    catch(e) {
      return e;
    }
  }



