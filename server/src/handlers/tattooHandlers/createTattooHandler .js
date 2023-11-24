const createTattoo = require("../../controllers/tattooControllers/createTattoo");

const createTattooHandler = async (req, res) => {
  const { size, image, bodyPlace, duration } = req.body;
  try {
    const newTattoo = await createTattoo(size, image, bodyPlace, duration);
    res.status(201).json(newTattoo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTattooHandler;
