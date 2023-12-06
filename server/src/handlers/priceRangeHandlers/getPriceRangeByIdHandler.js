const getPriceRangeById = require("../../controllers/priceRangeControllers/getPriceRangeById");

const getPriceRangeByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const priceRangeById = await getPriceRangeById(id);
    if (priceRangeById) {
      res.status(200).json(priceRangeById);
    } else {
      res.status(404).json({ message: "Price range  not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPriceRangeByIdHandler;
