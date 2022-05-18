const Repository = require("../ports/Repository");

const retrieveStockValues = async (stockID) => {
  try {
    const stockValue = await Repository.getStockData(stockID);

    return stockValue;
  } catch (err) {
    return err;
  }
};

module.exports = {
  retrieveStockValues,
};
