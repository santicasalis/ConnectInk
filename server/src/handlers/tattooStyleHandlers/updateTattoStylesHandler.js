const updateTattoStyles = require("../../controllers/tattooStyleControllers/updateTattoStyles");

const updateTattoStylesHandler = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const newTattoStyle = await updateTattoStyles(id, name);
    res.status(201).json(newTattoStyle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = updateTattoStylesHandler;
