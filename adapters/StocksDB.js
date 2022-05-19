const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-east-1",
});

const getStockValue = async (stockID = "1") => {
  const data = [
    { id: "1", name: "stock1", value: 100 },
    { id: "2", name: "stock2", value: 200 },
    { id: "3", name: "stock3", value: 300 },
    { id: "4", name: "stock4", value: 400 },
    { id: "5", name: "stock5", value: 500 },
    { id: "6", name: "stock6", value: 600 },
  ];

  try {
    let stockData = null;
    for (let i = 0; i < data.length; i++) {
      console.log("data.id: " + data[i].id + " stockID: " + stockID);
      if (data[i].id == stockID) {
        stockData = data[i];
      }
    }
    console.log("Data: \n" + stockData);
    return stockData;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = getStockValue;
