const getPriceRangeById = require("../../controllers/PriceRangeControllers/getPriceRangeById");

const getPriceRangeByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const PriceRangeById = await getPriceRangeById(id);
    if (PriceRangeById) {
      res.status(200).json(PriceRangeById);
    } else {
      res.status(404).json({ message: "PriceRange  not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPriceRangeByIdHandler;
