const { PriceRange } = require("../../db");

const getPriceRange = async () => {
  const allPriceRanges = await PriceRange.findAll();

  return allPriceRanges;
};

module.exports = getPriceRange;
