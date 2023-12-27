const createPriceRange = require("../../controllers/priceRangeControllers/createPriceRange");

const createPriceRangeHandler = async (req, res) => {
  const { tattooArtistId, size, priceMin, priceMax } = req.body;
  try {
    const newPriceRange = await createPriceRange(tattooArtistId, size, priceMin, priceMax);
    res.status(201).json(newPriceRange);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createPriceRangeHandler;