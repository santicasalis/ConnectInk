const createPriceRange = require("../../controllers/priceRangeControllers/createPriceRange");

const createPriceRangeHandler = async (req, res) => {
  const { tattooArtistId, size, priceMin, priceMax } = req.body;
  try {
    const newPriceRange = await createPriceRange(
      tattooArtistId,
      size,
      priceMin,
      priceMax
    );
    if (newPriceRange.code === 201) {
      res.status(201).json({
        message: newPriceRange.message,
        data: newPriceRange.data,
      });
    } else {
      res.status(newPriceRange.code).json({ error: newPriceRange.error });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

module.exports = createPriceRangeHandler;
