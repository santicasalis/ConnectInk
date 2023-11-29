const updatePriceRange = require("../../controllers/priceRangeControllers/updatePriceRange");

const updatePriceRangeHandler = async (req, res) => {
  const { id } = req.params;
  const { size, priceMin, priceMax } = req.body;
  try {
    const updatedPriceRange = await updatePriceRange(
      id,
      size,
      priceMin,
      priceMax,
    );
    res.status(200).json(updatedPriceRange);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updatePriceRangeHandler;
