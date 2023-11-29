const getPriceRange = require("../../controllers/PriceRangeControllers/getPriceRange");

const getPriceRangeHandler = async (req, res) => {
  try {
    const allPriceRange = await getPriceRange();
    if (allPriceRange.length > 0) {
      res.status(200).json(allPriceRange);
    } else {
      res.status(404).json({ message: "PriceRange not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPriceRangeHandler;
