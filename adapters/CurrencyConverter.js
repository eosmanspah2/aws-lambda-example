const axios = require("axios");

const API_KEY = process.env.API_KEY;

const getCurrencies = async (currencies) => {
  try {
    // replace with  URL from the service
    const res = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${"83jFBGkHXS0EOuyGAYZlopY2baFcGOjM"}&symbols=${currencies.toString()}`
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

module.exports = getCurrencies;
