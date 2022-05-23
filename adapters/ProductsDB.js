import AWS from '/var/runtime/node_modules/aws-sdk/lib/aws.js';
import { v4, v5 } from "uuid";
import { join } from 'path';

AWS.config.update({
    region: "us-east-1"
});

const documentClient = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;
const dynamoDBTableName = process.env.TABLE_NAME;

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
  try{
    const params = {
      TableName: TableName
    }
    let response = null;
    const allProducts = await scanDynamoRecords(params, []);
    console.log(allProducts);
    if(allProducts==null || allProducts==[]){
      response = {
        statusCode: 404,
        body: JSON.stringify({message: "There are no products in the database"})
    }
    }
    else{
      response = {
        'statusCode': 200,
        'body': JSON.stringify(allProducts)
      }
    }
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getProductValue (id){
  try {
    const Key = { id: id };
    const data = await documentClient.get({ TableName, Key }).promise();
    let response = null;
    if(data.Item==undefined){
      response = {
        statusCode: 404,
        body: JSON.stringify({message:"404 not found"})
      }
    }
    else{
      response = {
        statusCode: 200,
        body: JSON.stringify(data.Item)
      }
    }
    
    return response;
  } catch (error) {
  console.log(error);
  }
}

const getProductValueHelp = async (id) => {
  const product = await documentClient.get({
    TableName: dynamoDBTableName,
    Key: {
      id: id,
    }
  }).promise();

  return product.Item;
    
  }

  export const insertProductValue = async (requestBody) => {
    try{
      let request = JSON.parse(requestBody);
      let response = null;
      const objekat = {
        id:v4(),
        ...request
      }
  
      const params = {
        TableName: dynamoDBTableName,
        Item: objekat
      }

      const result = await documentClient.put(params).promise();
      if(result != null){
        response = {
        statusCode: 200,
        body: JSON.stringify(objekat)
        }
      }
      else{
        response = {
          statusCode: 404,
          body: JSON.stringify({message:"404 not found"})
        }
      }
      return response;
      }
      catch(e){
        console.log(e);
      }
  }

  export const updateProductValue = async (id, requestBody) => {
   try{
    const requestBody2 = JSON.parse(requestBody);
    const product = {
     ...requestBody2,
     id: id
   };

   await documentClient.put({
     TableName: dynamoDBTableName,
     Item: product
   }).promise();
   
   let response = null;

   if(product==null){
    response = {
      statusCode: 404,
      body: JSON.stringify({message:"404 not found"})
    }
  }
  else{
    response = {
      statusCode: 200,
      body: JSON.stringify(product)
    }
  }
  return response;
  }catch (e) {
    return e;
  }

  }

  export const deleteProductValue = async (id) => {
    try{
      let response = null;
      const product = await getProductValueHelp(id);
      console.log(product);
      await documentClient.delete({
        TableName: dynamoDBTableName,
        Key: {
          id: id,
        }
      }).promise();

      if(product==null){
        response = {
          statusCode: 404,
          body: JSON.stringify({message:"404 not found"})
        }
      }
      else{
        response = {
          statusCode: 200,
          body: JSON.stringify(product)
        }
      }
      return response;
    }
    catch(e) {
      return e;
    }
  }



