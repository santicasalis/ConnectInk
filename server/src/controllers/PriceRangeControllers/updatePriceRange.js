const { PriceRange } = require("../../db");

const updatePriceRange = async (id, priceMin, priceMax) => {
  const priceRangeFound = await PriceRange.findByPk(id);
  if (!priceRangeFound) {
    return { code: 404, error: "Price range not found" };
  }

  if (priceMin > priceMax) {
    return {
      code: 400,
      error: "The minimum price must be less than the maximum price",
    };
  }

  try {
    const updatedPriceRange = await PriceRange.update(
      {
        priceMin: priceMin,
        priceMax: priceMax,
      },
      { where: { id: id } }
    );
    return {
      code: 201,
      message: "Price range updated successfully",
      data: updatedPriceRange,
    };
  } catch (error) {
    return { code: 400, error: "Something went wrong" };
  }
};

module.exports = updatePriceRange;
