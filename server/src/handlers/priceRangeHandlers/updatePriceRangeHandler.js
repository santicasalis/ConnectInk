const updatePriceRange = require("../../controllers/priceRangeControllers/updatePriceRange");

const updatePriceRangeHandler = async (req, res) => {
  const { id } = req.params;
  const { priceMin, priceMax } = req.body;
  try {
    const updatedPriceRange = await updatePriceRange(id, priceMin, priceMax);
    if (updatedPriceRange.code === 201) {
      res
        .status(201)
        .json({
          message: updatedPriceRange.message,
          data: updatedPriceRange.data,
        });
    } else {
      res
        .status(updatedPriceRange.code)
        .json({ error: updatedPriceRange.error });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updatePriceRangeHandler;
