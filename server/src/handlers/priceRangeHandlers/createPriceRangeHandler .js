const createPriceRange = require("../../controllers/PriceRangeControllers/createPriceRange");

const createPriceRangeHandler = async (req, res) => {
  const { artistId, size, priceMin, priceMax } = req.body;
  try {
    const newPriceRange = await createPriceRange(artistId, size, priceMin, priceMax);
    res.status(201).json(newPriceRange);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createPriceRangeHandler;
