const getTattoo = require("../../controllers/tattooControllers/getTatto");

const getTattooHandler = async (req, res) => {
  try {
    const allTattoo = await getTattoo();
    if (allTattoo.length > 0) {
      res.status(200).json(allTattoo);
    } else {
      res.status(404).json({ message: "Tattoo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTattooHandler;
