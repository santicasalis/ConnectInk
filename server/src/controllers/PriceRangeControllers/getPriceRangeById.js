const { PriceRange } = require("../../db");

const getPriceRangeById = async (id) => {
  const priceRange = await PriceRange.findByPk(id);
  return {
    id: priceRange.id,
    size: priceRange.size,
    priceMin: priceRange.priceMin,
    priceMax: priceRange.priceMax,
  };
};

module.exports = getPriceRangeById;
