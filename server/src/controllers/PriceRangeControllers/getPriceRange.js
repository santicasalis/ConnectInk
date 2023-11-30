const { PriceRange } = require("../../db");

const getPriceRange = async () => {
  const allPriceRange = await PriceRange.findAll();

  return allPriceRange;
};

module.exports = getPriceRange;
