const createTattoStyle = require("../../controllers/tattooStyleControllers/createTattooStyle");

const createTattoStyleHandler = async (req, res) => {
  const { name } = req.body;
  try {
    const newTattoStyle = await createTattoStyle(name);
    res.status(201).json(newTattoStyle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTattoStyleHandler;
