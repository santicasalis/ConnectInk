const getPriceRange = require("../../controllers/priceRangeControllers/getPriceRange");

const getPriceRangeHandler = async (req, res) => {
  try {
    const allPriceRanges = await getPriceRange();
    if (allPriceRanges.length > 0) {
      res.status(200).json(allPriceRanges);
    } else {
      res.status(404).json({ message: "Price range not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPriceRangeHandler;
