const deleteTattoStyle = require("../../controllers/tattooStyleControllers/deleteTattooStyle");

const deleteTattoStyleHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTattooStyle = await deleteTattoStyle(id);
    res.status(200).json(deletedTattooStyle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteTattoStyleHandler;
