const { PriceRange } = require("../../db");

const updatePriceRange = async (id, size, image, priceMin, priceMax) => {
  const PriceRangeFounded = await PriceRange.findByPk(id);
  if (PriceRangeFounded) {
    await PriceRange.update(
      {
        size: size,
        image: image,
        priceMin: priceMin,
        priceMax: priceMax,
      },
      { where: { id: id } }
    );
    return "price range updated successfully";
  } else {
    return "Not found";
  }
};

module.exports = updatePriceRange;
