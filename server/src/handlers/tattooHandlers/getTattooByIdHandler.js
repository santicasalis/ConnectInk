const getTattooById = require("../../controllers/tattooControllers/getTattooById");

const getTattooByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const tattooById = await getTattooById(id);
    if (tattooById) {
      res.status(200).json(tattooById);
    } else {
      res.status(404).json({ message: "Tattoo  not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTattooByIdHandler;
